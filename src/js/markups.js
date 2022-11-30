const markupList = params => {
  return params
    .map(({ name: { official }, flags: { svg } }) => {
      return `<li class="country-item">
        <img src="${svg}" width="40px">
        <p class="country-name">${official}</p>
        </li>`;
    })
    .join('');
};

const markupInfo = params => {
  const [
    {
      name: { official },
      capital,
      population,
      flags: { svg },
      languages,
    },
  ] = params;

  return `<div class="box">
        <img src="${svg}" width="40px" />
        <h2 class="country-title">${official}</h2>
        </div>
        <p class="country-text"><span>Capital:</span> ${capital}</p>
        <p class="country-text"><span>Population:</span> ${population}</p>
        <p class="country-text"><span>Languages:</span> ${Object.values(
          languages
        ).join(', ')}</p>`;
};
export { markupList, markupInfo };
