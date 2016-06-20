var React = require('react')
  , ReactDOM = require('react-dom')
  , crystals = require('crystals')
  , ArtworkPriceQuickEdit = crystals.ArtworkPriceQuickEdit
  , ArtworkPriceVisibilityQuickEdit = crystals.ArtworkPriceVisibilityQuickEdit
  , ArtworkAvailabilityQuickEdit = crystals.ArtworkAvailabilityQuickEdit
  , artwork
  , saveUrl
  , optionsArray;

saveUrl = "http://private-ca2d0-artworks.apiary-mock.com/artworks/artwork-slug";

artwork = {
  id: "the-hours-spin-skull",
  title: "The Hours Spin Skull",
  artists: [],
  images: [],
  edition_sets: [],
  availability: "for sale",
  price_hidden: false,
  price_listed: 35500,
  display_price_range: false,
  internal_display_price: "$35,500"
};

ReactDOM.render(
  <ArtworkPriceQuickEdit
    artwork={artwork}
    saveUrl={saveUrl}
  />,
  document.getElementById("artwork-price-quick-edit")
);

optionsArray = [
  ["Display exact price", "exact"],
  ["Display price range", "range"],
  ["Display \"Contact for price\"", "hidden"]
];

ReactDOM.render(
  <ArtworkPriceVisibilityQuickEdit
    artwork={artwork}
    saveUrl={saveUrl}
    options={optionsArray}
  />,
  document.getElementById("artwork-price-visibility-quick-edit")
);

optionsArray = [
  ["For Sale", "for sale"],
  ["Not For Sale", "not for sale"],
  ["Sold", "sold"],
  ["On Hold", "on hold"]
]

ReactDOM.render(
  <ArtworkAvailabilityQuickEdit
    artwork={artwork}
    saveUrl={saveUrl}
    options={optionsArray}
  />,
  document.getElementById("artwork-availability-quick-edit")
);
