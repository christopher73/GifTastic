$("document").ready(function() {
  let search = "search";
  //let q; //query term
  let limit = 12; //max number of returns
  let rating; // filter for rating
  let request;
  let animes = [
    "One Punch Man",
    "Dragon Ball",
    "Death Note",
    "One Piece",
    "Fullmetal Alchemist",
    "Naruto Shippuden",
    "Pokemon"
  ];
  const api_call = api_q => {
    let api1 = `https://api.giphy.com/v1/gifs/search?api_key=XfU0MlNW2Tc0O1yFUMDnmGknfk6Aai7y&q=${api_q}&limit=${limit}&offset=0&rating=R&lang=en`;
    axios //I'm using axios since i want to get familiar with it and promises
      .get(api1)
      .then(function(response) {
        request = response.data; //stores
        console.log(request);
        for (let i = 0; i < limit; i++) {
          let img = $("<img>"); //declare jquery vars
          let imgDiv = $("<div>");
          imgDiv.attr({ class: "col-sm-4 m-auto" });
          img.attr({
            class: "gif w-100",
            alt: api_q,
            value: api_q,
            src: request.data[i].images.fixed_width_still.url, //stores still gif
            "alt-data": request.data[i].images.fixed_width.url, //to store regular gif in "alt-data"
            onclick: `var tmp = $(this).attr("src");
                      $(this).attr("src",$(this).attr("alt-data"));
                      $(this).attr("alt-data",tmp)` //this will switch the still gif for regular gif by declaring a tmp var and switching everytime is clicked
          });
          let rateDiv = $(
            `<div class="rate col-sm-12">Gif was rated ${
              request.data[i].rating
            }</div>`
          );
          imgDiv.append(img); //append to divs
          imgDiv.append(rateDiv); //append to divs
          $(".results").prepend(imgDiv);
        }
      })
      .catch(function(error) {
        console.log(error); //throw error stack if any
      });
  };
  const myanimes = () => {
    $(".buttons").empty();
    for (let i = 0; i < animes.length; i++) {
      var $og_input = $(
        `<input type="button" class="add m-auto btn-primary col-sm-3 " value="${
          animes[i]
        }" />`
      );
      $(".buttons").append($og_input);
    }
    $(".add").click(function() {
      api_call($(this).val());
    });
  };

  myanimes();
  $("form").submit(function(event) {
    let q = $("#input").val();
    if (q == "") {
      alert("Empty field or wrong input !!!");
      event.preventDefault(); //prevent from submitting/ refreshing page
      event.stopPropagation();
    } else {
      api_call(q);
      animes.push(q);
      myanimes();
    }
    event.preventDefault(); //prevent from submitting/ refreshing page
    event.stopPropagation();
  });
});
