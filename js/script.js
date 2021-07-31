function searchMovie() {
  // pakai $.getJSON()
  // $.getJSON("http://www.omdbapi.com/?apikey=d8c23a72&s=joker")
  // alert($("#search-input").val());

  // hapus html #movie-list dulu
  $("#movie-list").html("");

  // pakai $.ajax()
  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get", // bisa get(ambil/select), post(tambah), put(edit), delete(hapus)
    dataType: "json", // data return mau bentuk apa(text, json, jsonP, xml,)
    data: {
      // parameter/data yang mau dikirim ke url ajax, jika data cuma 1 bisa lgsung tulis, jika banyak bisa pakai object
      apikey: "d8c23a72",
      s: $("#search-input").val(),
    },
    success: function (result) {
      // kalau ajax sukses lakukan sebuah function, dan siapkan parameter result untuk ambil data(bentuk data langsung object/ langsung di parse)
      // console.log(result);

      // masuk ke object Search
      const results = result.Search;

      if (result.Response == "True") {
        // jika ada data yang direturn object Response isinya string True

        $.each(results, function (key, value) {
          // console.log(value);
          $("#movie-list").append(
            `
          <div class="col-md-4 mb-3">
              <div class="card">
              <img src="` +
              value.Poster +
              `" class="card-img-top">
                  <div class="card-body">
                      <h5 class="card-title">` +
              value.Title +
              `</h5>
              <h6 class="card-subtitle mb-2 text-muted">` +
              value.Year +
              `</h6>
              <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="` +
              value.imdbID +
              `">See Detail</a>
                  </div>
              </div>
          </div>
          `
          );
        });

        // hapus value pencarian
        $("#search-input").val("");
      } else {
        // pakai html biasa
        // $("#movie-list").html("<h1>Movie Not Found</h1>");

        // pakai object return dari json(ada key Error dengan value movie not found)
        // paka `` saja supaya tidak jadi string jadi bisa di enter
        $("#movie-list").html(
          `
          <div class="col">
            <h1 class="text-center">` +
            result.Error +
            `</h1>
          </div>
        `
        );
      }
    },
  });
}

// tombol search di klik
$("#search-button").on("click", function () {
  searchMovie();
});

// tombol enter di pencet
$("#search-input").on("keyup", function (event) {
  // kasih parameter untuk tangkap tombol enter
  // keyCode tombol enter = 13 (event.keyCode === 13 atau event.which === 13)
  if (event.keyCode === 13) {
    searchMovie();
  }
});

// $(".see-detail").on("click", function () {
//   // event binding/delegation, saat cari class see-detail class ini belum ada karena tombol see detail belum di klik(event ditempel pada element yag tidak ada)
//   // solusinya pindah eventnya di parent elementnya(#movie-list yang sudah ada di html biar bisa ditempel event)
//   console.log($(this).data("id"));
// });

$("#movie-list").on("click", ".see-detail", function () {
  // jQuery carikan elamen movie list, lalu ketika saya klik elemen dengan class .see-detail didlm #movie-list baik itu munculnya dari awal atau nanti, jalankan function berikut
  // ini namanya event binding/event delegation jadi eventnya tidak peduli elementnya muncul nanti atau dari awal sudah ada
  // console.log($(this).data("id"));

  // ajax see-detail
  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "d8c23a72",
      i: $(this).data("id"),
    },
    success: function (result) {
      if (result.Response === "True") {
        $(".modal-body").html(
          `
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4">
                <img src="` +
            result.Poster +
            `" class="img-fluid">
              </div>
              <div class="col-md-8">
                <ul class="list-group">
                  <li class="list-group-item"><h3>` +
            result.Title +
            `</h3></li>
                  <li class="list-group-item">Released : ` +
            result.Released +
            `</li>
            <li class="list-group-item">Genre : ` +
            result.Genre +
            `</li>
            <li class="list-group-item">Director : ` +
            result.Director +
            `</li>
            <li class="list-group-item">Actors : ` +
            result.Actors +
            `</li>
                </ul>
              </div>
            </div>
          </div>
        `
        );
      }
    },
  });
});
