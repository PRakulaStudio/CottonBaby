// Phone mask
$( function () {
    $('input[name=phone]').each( function () {
        $(this).inputmask('+7 (999) 999-99-99');
    })
});
// Phone mask end

function PopUpShowMenu(page){
    $("#menu").show();
    $("#menu-off").show();
    $("#menu-on").hide();
}
function PopUpHideMenu(){
    $("#menu-on").show();
    $("#menu-off").hide();
    $("#menu").hide();
}

function PopUpShowSearch(page){
    $("#search").show();
    $("#search-off").show();
    $("#search-on").hide();
}
function PopUpHideSearch(){
    $("#search-on").show();
    $("#search-off").hide();
    $("#search").hide();
}