#!/usr/bin/env python3
"""Compare Whisper models on an already-generated MMS sample.

Diagnostic only: it never changes audio, overrides, production state,
IndexedDB, or backup data.
"""
from __future__ import annotations
import argparse, csv, json, re, subprocess
from pathlib import Path
from statistics import mean

def norm(text: str) -> str:
    return re.sub(r"[^a-z0-9áéíóúüñ'\s-]", " ", (text or "").lower())
def words(text: str) -> list[str]:
    return [w for w in norm(text).split() if w]
def edit_distance(a: list[str], b: list[str]) -> int:
    prev=list(range(len(b)+1))
    for i,x in enumerate(a,1):
        cur=[i]
        for j,y in enumerate(b,1):
            cur.append(min(cur[-1]+1,prev[j]+1,prev[j-1]+(x!=y)))
        prev=cur
    return prev[-1]
def score(target: str, transcript: str) -> float:
    a,b=words(target),words(transcript)
    return 1.0 if not a and not b else max(0.0,1.0-edit_distance(a,b)/max(len(a),len(b),1))
def transcribe(model: str, audio: Path, cache_dir: Path) -> str:
    code=("import whisper,sys; m=whisper.load_model(sys.argv[1], download_root=sys.argv[3], device='cpu'); "
          "r=m.transcribe(sys.argv[2], language='id', task='transcribe', fp16=False); print(r.get('text','').strip())")
    return subprocess.check_output(["python","-c",code,model,str(audio),str(cache_dir)],text=True,stderr=subprocess.DEVNULL).strip()

def main() -> int:
    ap=argparse.ArgumentParser()
    ap.add_argument("--report",required=True,type=Path); ap.add_argument("--audio-dir",required=True,type=Path)
    ap.add_argument("--model-a",default="base"); ap.add_argument("--model-b",default="small")
    ap.add_argument("--cache-dir",required=True,type=Path); ap.add_argument("--output",required=True,type=Path)
    args=ap.parse_args()
    rows=list(csv.DictReader(args.report.open(encoding="utf-8-sig"))); results=[]
    for index,row in enumerate(rows,1):
        audio=args.audio_dir/f"{row['ID']}.mp3"
        if not audio.exists(): continue
        a=transcribe(args.model_a,audio,args.cache_dir); b=transcribe(args.model_b,audio,args.cache_dir)
        ta,tb=row["original text"],a
        sa,sb=score(ta,a),score(ta,b); tw=words(ta); aw,bw=words(a),words(b)
        results.append({"ID":row["ID"],"original_text":ta,"baseline_status":row["status"],
                        f"{args.model_a}_transcript":a,f"{args.model_b}_transcript":b,
                        f"{args.model_a}_score":f"{sa:.4f}",f"{args.model_b}_score":f"{sb:.4f}",
                        f"{args.model_a}_target_word_hits":sum(w in aw for w in tw),
                        f"{args.model_b}_target_word_hits":sum(w in bw for w in tw),
                        "small_vs_base_delta":f"{sb-sa:.4f}",
                        "diagnostic":"both_low" if sa<.25 and sb<.25 else "small_improves" if sb>=sa+.20 else "base_improves" if sa>=sb+.20 else "similar"})
        print(f"[{index}/{len(rows)}] {row['ID']}",flush=True)
    args.output.parent.mkdir(parents=True,exist_ok=True)
    fields=list(results[0].keys()) if results else ["ID","original_text","baseline_status"]
    with args.output.open("w",encoding="utf-8",newline="") as fh:
        w=csv.DictWriter(fh,fieldnames=fields); w.writeheader(); w.writerows(results)
    summary={"rows":len(results),"baseline_review":sum(r["baseline_status"]=="revisar" for r in results),
             "both_low":sum(r["diagnostic"]=="both_low" for r in results),
             "small_improves":sum(r["diagnostic"]=="small_improves" for r in results),
             "base_improves":sum(r["diagnostic"]=="base_improves" for r in results),
             "similar":sum(r["diagnostic"]=="similar" for r in results),
             "mean_score":{args.model_a:round(mean(float(r[f"{args.model_a}_score"]) for r in results),4) if results else 0.0,
                           args.model_b:round(mean(float(r[f"{args.model_b}_score"]) for r in results),4) if results else 0.0},
             "interpretation":"Diagnóstico de ASR, no certificación de pronunciación. both_low no demuestra por sí solo que MMS pronuncie mal."}
    args.output.with_suffix(".summary.json").write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding="utf-8")
    print(json.dumps(summary,ensure_ascii=False,indent=2)); return 0
if __name__=="__main__": raise SystemExit(main())
