import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
    Progress: <span id="progress">0</span>
</div>
<div>
    <button id="play">Play</button>
</div>
`

