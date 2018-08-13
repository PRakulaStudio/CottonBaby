'use strict';

(function () {

    Promise.all([requestCheckAuth('search'), createPagination(pms.plugins.catalog.search.count, 'search')]).then(function (results) {
        IS_AUTH = results[0];
        if (results[0]) {
            var list_id = [];
            document.querySelectorAll('div[data-catalog-item-id]').forEach(function (currentValue, index, array) {
                list_id.push(currentValue.getAttribute('data-catalog-item-id'));
            });

            requestCheckFavoritesItems(list_id, 'card-box');
        }
    });
})();
