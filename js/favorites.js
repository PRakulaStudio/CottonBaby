'use strict';

(function () {

    var limitItemsFavorites = 9;

    function requestGetFavorites(offset, limit, orderBy, pageName) {
        //console.log( requestGetItems );
        var count = requestGetItems(offset, limit, orderBy, pageName);
        return count;
    }

    requestCheckAuth("favorites").then(function (result) {
        if (result) {
            var totalItems = document.querySelector('div.header-user div[data-favorite]').innerText,
                promise = requestGetFavorites(0, limitItemsFavorites, 'DESC', 'favorites');

            createPagination(totalItems, 'favorites');
            return promise;
        }
    }, function (error) {
    }).then(function (response) {

        for (var key = 0; key < response.length; key++) {
            addFavoriteButtons(document.querySelector('div.card-box div[data-catalog-item-id="' + response[key] + '"] , div.products-box div[data-catalog-item-id="' + response[key] + '"]'), true);
        }
    });
})();
