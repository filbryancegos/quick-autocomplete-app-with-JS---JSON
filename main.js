const [search,matchlist] = [document.querySelector('#search'),document.querySelector('#match-list')];

const searchStates = async searchText => {
   const res = await fetch ('state_capitals.json'); 
   const states = await res.json();
   
   let matches = states.filter(state => {
      const regex = new RegExp(`^${searchText}`,'gi');
      return state.name.match(regex) || state.abbr.match(regex);
   })

   if (searchText.length === 0) {
        matches = '';
        matchlist.innerHTML = "";
   }

   outputHTML(matches);
}

const outputHTML = state => {
    if (state.length > 0) {
        const html = state.map(states => {
            return `
                <div class="card-body mb-1">
                    <h4>${states.name} ${states.abbr} <span class=text-primary>${states.capital}</span></h4>
                    <small>Lat: ${states.lat} / Long: ${states.long}</small>
                </div>
            `;
        }).join('');
        matchlist.innerHTML = html;
    }
}
search.addEventListener('input', () => searchStates(search.value));


