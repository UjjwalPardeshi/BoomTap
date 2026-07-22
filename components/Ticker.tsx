const PHRASE =
  "boots · cats · ts · boots boots · cats · made with my mouth · kick · snare · hat · 808 · psh · ka · dun dun · tss · ";

export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        <span>{PHRASE}</span>
        <span>{PHRASE}</span>
      </div>
    </div>
  );
}
