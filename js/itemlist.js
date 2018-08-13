(function () {

    if (!window.pms) window.pms = {};
    if (!window.pms.plugin) window.pms.plugin = {};
    if (!window.pms.plugin.SecArgonia) window.pms.plugin.SecArgonia = {};
    if (!window.pms.plugin.SecArgonia.itemlist) window.pms.plugin.SecArgonia.itemlist = {};

    let itemlist = pms.plugin.SecArgonia.itemlist;

    let template = itemlist.template =
        `
<div class="workspace-wrapper">
    <div id="controls-menu" class="horizontal-flex-menu">
        <div class="flex-left">
            <div class="menu-button-section">
                
            </div>
            <div style="margin-left: .5rem"><span> / </span></div>
        </div>
        <div class="flex-right">
            
        </div>
    </div>
    <ul class="flex-table header" style="padding: 0 1rem;width: calc(100% - 2rem)">
       
    </ul>
    <div class="workspace-section scrollbox" id="workspaceSection">
        <ul class="flex-table">
            <li>
                <div>1</div>
                <div>Название товара</div>
                <div>Описание товара</div>
                <div class="flex-right">
                    <button onclick="viewItemPage();" title="Открыть на сайте">👁</button>
                    <button title="Статистика">📈</button>
                    <button onclick="showUpdateCatalogItem()" title="Редактировать">✏️</button>
                    <button title="Удалить">❌</button>
                </div>
            </li>
        </ul>
    </div>
</div>

<style>
    .workspace-section {
        margin-top: 0 !important;
        padding-top: 0 !important;
        /*overflow: scroll;*/
    }

    .flex-table {
        padding-top: .5rem;
    }

    .flex-table * {
        transition: none;
    }

    .flex-table > li * {
           line-height: 1rem;
        height: auto;
        font-size: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .flex-table > li > *:nth-child(1) {
        width: 1%;
        min-width:1%;
    }

    .flex-table > li > *:nth-child(2) {
        width: 10%;       
        min-width:10%;
    }    

    .flex-table > li > *:nth-child(3) {
        width: 15%;
        min-width:15%;
    }
    .flex-table > li > *:nth-child(4) {
        width: 10%;   
        min-width:10%;    
    }
    
    .flex-table > li > *:nth-child(5) {
        width: 23%;   
        min-width:23%;    
    }
    .flex-table > li > *:nth-child(6) {
        width: 18%;       
    }
    .flex-table > li > *:nth-child(7) {
        width: 17%;  
        min-width:17%;     
    }
    .flex-table > li > *:nth-child(8) {
        width: 11%;      
        min-width:11%; 
    }
     .flex-table > li > *:nth-child(9) {
        width: 11%;   
        min-width:11%;    
    }
     .flex-table > li > *:nth-child(10) {
        width: 7%;   
        min-width:7%;    
    }
     .flex-table > li > *:nth-child(11) {
        width: 11%;   
        min-width:11%    
    }

    .flex-table > li button {
        opacity: 0;
        pointer-events: none;
        border: none;
        background: none;
        margin: 0 .5rem;
        height: 1rem;
        font-size: .8rem;
    }

    .workspace-section > .flex-table > li:hover {
        -webkit-box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.2);
        box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.2);
    }

    .flex-table > li:hover button {
        cursor: pointer;
        opacity: 1;
        pointer-events: all;
    }

    .workspace-wrapper input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        height: 2rem;
        line-height: 2rem;
        border: 1px dashed #999;
        border-radius: 5px;
        padding: 0 .5rem;
        font-size: 1rem;
        font-weight: 100;
        /*cursor: pointer;*/
        background: #FFFFFF;
        white-space: nowrap;
    }
    
    .flex-right.buttons {
        flex-direction: row;
    }
    
    /* BASKET */
 input, button{
    text-align: center;
}

.editor-container {
  width: 100%;
}

.order div {
 width: 100%;
}

.shest { 
  -moz-appearance: textfield;
}
.shest::-webkit-inner-spin-button { 
  display: none;
}

.basket {
    max-width: 1080px;
    margin: 0 auto;
}

.basket-empty {
    display: none;
    width: 99%;
    margin: auto;
    border-radius: 5px;
    background: #F0F0F0;
}

.basket-empty p{
    width: 100%;
    padding: 5px 20px;
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    font-size: 20px;
    line-height: 50px;
    color: #b6b6b6;
}

.basket-container {
    display: none;
}

.basket-box {
    width: 99%;
    margin: auto;
    display: flex;
    flex-direction: column;
}

.basket-box > div:nth-child(even){
    background: #F7F7F5;
}

.basket-product {
    width: 100%;
  /*  margin: auto auto 20px auto;
    border: 1px solid #E4E3DF;*/
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    /*flex-wrap: wrap;*/
}

.basket-product > div:nth-child(1) {
    width: 95%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.basket-product > div:nth-child(1) > div:nth-child(1) {
    width: 50%;
    display: flex;
    flex-direction: row;
}

.basket-product > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) {
    width: 65%;
    padding: 0 10px;
    border: 1px solid #E4E3DF;
    display: flex;
}

.basket-product > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div{
    width: 100%;
    overflow: hidden;
    margin: auto;
    display: flex;
    flex-direction: row;
}

.basket-product > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div img{
    width: 50px;
    height: 50px;
    margin: auto 10px auto 0;
}

.basket-product > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div p{
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    font-size: 16px;
    margin:0;
    color: #000000;
}

.basket-product > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div a{
    text-decoration: none;
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    font-size: 16px;
    color: #682333;
}

.basket-product > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div a:hover{
    text-decoration: underline;
}

.basket-product > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) {
    width: 35%;
    padding: 10px;
    border: 1px solid #E4E3DF;
    display: flex;
}

.basket-product > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) div{
    margin: auto;
}

.basket-product > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) div p{
    width: 100%;
    margin: 0 0 10px 0;
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    text-align: center;
    font-size: 16px;
    color: #000000;
}

.basket-product > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) div span{
    width: 100%;
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    text-align: center;
    font-size: 20px;
    color: #FF0016;
}

.basket-product > div:nth-child(1) > div:nth-child(2) {
    width: 50%;
    display: flex;
    flex-direction: row;
}

.basket-product > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) {
    width: 65%;
    padding: 10px;
    border: 1px solid #E4E3DF;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: space-between;
}

.basket-product > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div{
      width: 32%;
    height: 46px;
    padding: 5px 0;
    margin: 1% 0;
    /*border-radius: 10px;*/
    background: #f1f1f1;
    text-align: center;
}

.basket-product > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3n+2){
    margin: 1% 2%;
}

.basket-product > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div p{
    width: 100%;
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    text-align: center;
    font-size: 16px;
}

.basket-size-on {
    background: #F50037 !important;
}

.basket-size-on p{
    color: #FFFFFF;
}

.basket-product > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div input{
    border: none;
    width: 30px;
    border-radius: 5px;
    height: 20px;
    padding: 2px 0 0 0;
    margin: 0 5px;
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    text-align: center;
    font-size: 16px;
    color: #000000;
}

.basket-product > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div button{
    cursor: pointer;
    background: #FFFFFF;
    border: 1px solid #E6E6E6;
    border-radius: 15px;
   /* padding: 2px;*/
    width: 20px;
    height: 20px;
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    text-align: center;
    font-size: 16px;
    color: #000000;
}

.basket-product > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) {
    width: 35%;
    padding: 10px;
    border: 1px solid #E4E3DF;
    display: flex;
}

.basket-product > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) div{
    margin: auto;
}

.basket-product > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) div p{
    width: 100%;
    margin: 0 0 10px 0;
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    text-align: center;
    font-size: 16px;
    color: #000000;
}

.basket-product > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) div span{
    width: 100%;
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    text-align: center;
    font-size: 20px;
    color: #FF0016;
}

.basket-product > div:nth-child(2) {
    width: 5%;
    border: 1px solid #E4E3DF;
}

.basket-product > div:nth-child(2) button{
    cursor: pointer;
    background: none;
    border: none;
    width: 100%;
    height: 100%;
    font-size: 20px;
}

.basket-total {
    width: 99%;
    margin: auto auto 50px auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.basket-total div:nth-child(1) {
    width: 300px;
    margin: auto auto auto 0;
}

.basket-total div:nth-child(1) p{
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
}

.basket-total div:nth-child(1) span{
    font-size: 20px;
    color: #FF0016;
}

.basket-total div:nth-child(2) {
    display: none;
    width: 300px;
    margin: auto;
}

.basket-total div:nth-child(2) button{
    cursor: pointer;
    width: 300px;
    height: 50px;
    margin: 0 auto;
    padding: 19px 0;
    border: none;
    border-radius: 25px;
    background: linear-gradient(to bottom, #F9C33C, #ff7b00);
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    font-size: 14px;
    text-transform: uppercase;
    color: #FFFFFF;
    background-size: auto 150%;
    background-position: 0 100%;
    transition: background-position 1s;
}

.basket-total div:nth-child(2) button:hover{
    margin: 2px auto -2px auto;
    background-position: 0 0;
}

.basket-total div:nth-child(3) {
    width: 300px;
    height: 50px;
    background: #E4E3DF;
    margin: auto 0 auto auto;
    display: flex;
}

.basket-total div:nth-child(3) p{
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    text-align: center;
    font-size: 16px;
    color: #000000;
    margin: auto;
}

.basket-total div:nth-child(3) span{
    font-size: 20px;
    color: #FF0016;
}

.payment-box {
    width: 320px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}

.payment-box > div{
    display: flex;
    flex-direction: row;
}

.payment-box > p{
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    margin: auto auto 20px auto;
    text-align: center;
    font-size: 24px;
    color: #F30330;
}

.payment-box > div > div:nth-child(1) {
    width: 100px;
    margin: 0 auto auto auto;
}

.payment-box > div > div:nth-child(1) p{
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    text-align: center;
    text-transform: uppercase;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
    margin: auto;
}

.payment-box > div > div:nth-child(1) button{
    cursor: pointer;
    width: 100px;
    height: 100px;
    margin: auto auto 10px auto;
    padding: 19px 0;
    border: 2px solid #C4C4C4;
    border-radius: 5px;
    background: #FFFFFF;
}

.payment-box > div > div:nth-child(1) button:hover{
    border: 2px solid #F9C33C;
    background: #F9C33C;
}

.payment-box > div > div:nth-child(2) {
    width: 100px;
    margin: 0 auto auto auto;
}

.payment-box > div > div:nth-child(2) p{
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    text-align: center;
    text-transform: uppercase;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
    margin: auto;
}

.payment-box > div > div:nth-child(2) button{
    cursor: pointer;
    width: 100px;
    height: 100px;
    margin: auto auto 10px auto;
    padding: 19px 0;
    border: 2px solid #C4C4C4;
    border-radius: 5px;
    background: #FFFFFF;
}

.payment-box > div > div:nth-child(2) button:hover{
    border: 2px solid #F9C33C;
    background: #F9C33C;
}

.payment-activ {
    border: 2px solid #F9C33C !important;
    background: #F9C33C !important;
}

.address-box {
    width: 99%;
    margin: 20px auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    border: 2px solid #E4E3DF;
    border-radius: 5px;
}

.address-box > p{
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
   /* margin: auto auto 10px auto;*/
    /*text-align: center;*/
    font-size: 18px;
    line-height: 25px;
    color: #000000;
}

.address-box button{
    cursor: pointer;
    width: 200px;
    height: 30px;
    margin: auto;
    padding: 9px 0;
    border: none;
    border-radius: 25px;
    background: linear-gradient(to bottom, #F9C33C, #ff7b00);
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    font-size: 16px;
    color: #FFFFFF;
    background-size: auto 150%;
    background-position: 0 100%;
    transition: background-position 1s;
}

.address-box button:hover{
    margin: 1px auto -1px auto;
    background-position: 0 0;
}

.basket-liner {
    width: 100%;
    margin: 20px auto;
    height: 2px;
    background: #DDDEE0;
}

.basket-order {
    width: 100%;
    margin: auto auto 20px auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.basket-order div:nth-child(1) {
    width: 300px;
    margin: auto auto auto 0;
}

.basket-order div:nth-child(1) button{
    cursor: pointer;
    width: 300px;
    height: 50px;
    border: 2px solid #D7DFE5;
    border-radius: 25px;
    background: #D7DFE5;
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    font-size: 18px;
    color: #000000;
}

.basket-order div:nth-child(1) button > img{
    vertical-align: baseline;
    margin: 0 10px 0 0;
}

.basket-order div:nth-child(1) button:hover{
    border: 2px solid #F30330;
}

.basket-order div:nth-child(2) {
    width: 300px;
    margin: auto 0 auto auto;
}

.basket-order div:nth-child(2) p{
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    text-align: right;
    font-size: 12px;
    line-height: 20px;
    color: #000000;
}

.basket-order div:nth-child(2) a{
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    text-align: right;
    font-size: 12px;
    line-height: 20px;
    color: #FF0016;
}

.basket-order div:nth-child(2) a:hover{
    text-decoration: none;
}

.basket-order div:nth-child(3) {
    width: 300px;
    margin: auto 0 auto 10px;
}

.basket-order div:nth-child(3) button{
    border: none;
    width: 300px;
    height: 50px;
    border-radius: 25px;
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    text-transform: uppercase;
    font-size: 18px;
}

.basket-order-off button{
    background: #D7DFE5;
    color: #BABABA;
}

.basket-order-on button{
    cursor: pointer;
    color: #FFFFFF;
    background: linear-gradient(to bottom, #FDC435, #F30330);
    background-size: auto 150%;
    background-position: 0 100%;
    transition: background-position 1s;
}

.basket-order-on button:hover{
    margin: 2px auto -2px auto;
    background-position: 0 0;
}

/* BASKET */

/* ORDERS */

.orders {
    display: flex;
    flex-direction: column;
}

.order {
    display: flex;
    flex-direction: row;
    border: 1px solid;
    margin: 1px 0;
    justify-content: space-between;
    padding: 5px;
}

</style>` + `
     <style>
            
            @media (max-width: 1000px) {
                .flex-left, .flex-right{
                    flex-direction:column;
                }              
            }            
           
            
            @media (max-width: 640px) {      
                
                
                div.workspace-section#workspaceSection ul.flex-table li{
                    flex-direction:column;
                    border: 1px solid #efebeb;
                    box-shadow: 0 24px 24px 0 rgba(0, 0, 0, 0.12);
                }
                
                .flex-table > li button{
                    opacity: 1;
                    font-size: 1.5rem;
                    line-height: 1.5rem;
                    height: 1.5rem;
                }
                
                 .flex-table > li > *:nth-child(1) {
                    width: 100%;
                    min-width:100%;
                }
            
                .flex-table > li > *:nth-child(2) {
                    width: 100%;       
                    min-width:100%;
                }    
            
                .flex-table > li > *:nth-child(3) {
                    width: 100%;
                    min-width:100%;
                }
                .flex-table > li > *:nth-child(4) {
                    width: 100%;   
                    min-width:100%;    
                }
                
                .flex-table > li > *:nth-child(5) {
                    width: 100%;   
                    min-width:100%;    
                }
                .flex-table > li > *:nth-child(6) {
                    width: 100%;       
                }
                .flex-table > li > *:nth-child(7) {
                    width: 100%;  
                    min-width:100%;     
                }
                .flex-table > li > *:nth-child(8) {
                    width: 100%;      
                    min-width:100%; 
                }
                 .flex-table > li > *:nth-child(9) {
                    width: 100%;   
                    min-width:100%;    
                }
                 .flex-table > li > *:nth-child(10) {
                    width: 100%;   
                    min-width:100%;    
                }
                 .flex-table > li > *:nth-child(11) {
                    width: 100%;   
                    min-width:100%    
                }
            }            
        </style>
`;

    itemlist.orderId = 0;
    itemlist.apiPath = '/system/plugins/secargonia/itemlist/';


    // TODO: Обработчик рабочего пространства, тут мы подготавливаем верстку и первичное наполенение в зависимости от полученных параметров
    itemlist.workspaceGenerator = function (parameters = false) {
        return new Promise(function (resolve, reject) {
            console.log(parameters);
            //  createNotification(pms.config.name, '<p>Плагин "Кабинет" временно недоступен!</p><br><p>Идет процесс обновления плагина на вашм сайте.</p>', pms.config.icon);
            if (!parameters || !parameters.id)
                return resolve({status: false});

            switch (parameters.id) {
                case 'plugin-itemlist-portfolio':
                    return itemlist.requestListDirectories().then(function (result) {
                        return resolve({status: result});
                    });
                default:
                    return resolve({status: false});
                    break;
            }
        });
    };

    itemlist.workspaceLoader = function () {
        let template = '';
    };

    // TODO: Обработчик клика по элементу в меню, вызывается только при клике по элементу с типом "group" и отдает массив вложенных элементов
    itemlist.menuItemsWorker = function (parameters = {}) {
        return [
            {
                id: 'plugin-itemlist-portfolio',
                title: 'Портфолио',
                type: 'item',
                parameters: parameters
            }
        ];

    };

    itemlist.requestListDirectories = function () {
        let data = {};
        pms.workspace.wrapper.innerHTML = itemlist.template;
        return io('console/host/pluginRequest', {
            hostId: pms.selectedHost.id,
            requestPath: itemlist.apiPath + 'pms/portfolio/list-directories'
        }, data).then(function (response) {
            if (!response.status || !response.response) return false;
            itemlist.showDirectories(response.response);
        });

    };

    itemlist.showDirectories = function (response) {
        if (!response || !response.status) return false;
        if (!response.data || !response.data.directories) return false;
        let directories = response.data.directories;
        let renderedDirectories = [];


        for (let key in directories) {
            renderedDirectories[key] =
                `<li class="list-item" data-id="${directories[key].id}">
                    <div>${directories[key].id}</div>
                    <div>${directories[key].name}</div>                   
                    <div class="flex-right buttons bottom-buttons">                                            
                        <button class="get-directory" data-id="${directories[key].id}" title="Открыть">Открыть</button>                       
                    </div>
                </li>`;
        }

        document.querySelector('ul.flex-table.header').innerHTML =
            `<li>
                <div>ID</div>
                <div>Название</div>                   
            </li>`;

        document.querySelector('div#workspaceSection').innerHTML =
            `<ul class="flex-table">
                ${renderedDirectories.join('')}
             </ul>   
            `;

        pms.workspace.wrapper.querySelector('.workspace-wrapper').addEventListener('click', function (event) {
            if (event.target.tagName === "BUTTON" && event.target.classList.contains('get-directory')) {
                let directoryId = event.target.dataset.id;
                itemlist.eventGetDirectory(directoryId);
            }
        });
        return true;
    };

    itemlist.requestListItems = function (id) {
        let data = {};
        pms.workspace.wrapper.innerHTML = itemlist.template;

        return io('console/host/pluginRequest', {
            hostId: pms.selectedHost.id,
            requestPath: itemlist.apiPath + 'pms/portfolio/list-directory-items/' + id
        }, data).then(function (response) {
            if (!response.status || !response.response) return false;
            itemlist.showItems(response.response);
        });

    };

    itemlist.showItems = function (response) {
        if (!response || !response.status) return false;
        if (!response.data || !response.data.items) return false;
        let items = response.data.items;
        let renderedItems = [];


        for (let key in items) {
            renderedItems[key] =
                `<li class="list-item" data-id="${items[key].id}">
                    <div>${items[key].id}</div>
                    <div>${items[key].name}</div>  
                                     
                    <div class="flex-right buttons bottom-buttons">                                            
                        <button class="get-item" data-id="${items[key].id}" title="Открыть">Открыть</button>  
                        <button class="delete-item" data-id="${items[key].id}" title="Удалить">Удалить</button>                     
                    </div>
                </li>`;
        }

        document.querySelector('ul.flex-table.header').innerHTML =
            `<li>
                <div>ID</div>
                <div>Название</div>                   
            </li>`;

        document.querySelector('div#workspaceSection').innerHTML =
            `<ul class="flex-table">
                ${renderedItems.join('')}
             </ul>   
            `;

        pms.workspace.wrapper.querySelector('.workspace-wrapper').addEventListener('click', function (event) {
            if (event.target.tagName === "BUTTON" && event.target.classList.contains('get-item')) {
                let itemId = event.target.dataset.id;
                console.log("GET ITEM");
                itemlist.eventGetItem(itemId);
            }
        });

        /* pms.workspace.wrapper.querySelector('.workspace-wrapper').addEventListener('click' , function(event) {
             if(event.target.tagName === "BUTTON" && event.target.classList.contains('delete-item')) {
                 let itemId = event.target.dataset.id;
                 itemlist.eventDeleteItem(itemId);
             }
         });*/
        return true;
    };

    itemlist.requestGetItem = function (itemId) {
        let data = {};
        //--Заполнение шаблона заказа и вывод на страницу
        return io('console/host/pluginRequest', {
            hostId: pms.selectedHost.id,
            requestPath: itemlist.apiPath + 'portfolio/getitem/' + itemId,
            mode: 'get'
        }, data).then(function (response) {
            if (!response.status || !response.response) return false;
            itemlist.showItem(response.response);
        });
    };

    itemlist.eventGetItem = function (itemId = null) {
        if (!itemId) return false;

        itemlist.requestGetItem(itemId);
    };


    itemlist.showItem = function (response) {
        if (!response || !response.status) return false;
        let item = {};
        if (response.data.item) item = response.data.item;
        pms.workspace.wrapper.innerHTML = itemlist.template;

        itemlist.itemId = item.id;
        let output = `<div class="address-box">                            
                             <p>Название: <input type="text" name="name" value="${item.name}" /></p>
                             <p>Ссылка на видео: <input type="text" name="href" value="${item.href}" /></p>  
                             <p>Ссылка на превью: <input type="text" name="img_href" value="${item.img_href}" /></p>                                                    
                      </div>    
                      <div><button class="save-item">Сохранить</button></div>                 
                      <div class="basket-liner"></div>`;

        pms.workspace.wrapper.querySelector('.workspace-wrapper').addEventListener('click', function (event) {
            if (event.target.tagName === "BUTTON" && event.target.classList.contains('save-item')) {
                let data = {
                    name: pms.workspace.wrapper.querySelector('input[name="name"]').value,
                    href: pms.workspace.wrapper.querySelector('input[name="href"]').value,
                    img_href: pms.workspace.wrapper.querySelector('input[name="img_href"]').value
                };
                if (item.id != undefined) {
                    itemlist.requestSaveItem(item.id, data);
                }
                else {
                    itemlist.requestCreateItem(data)
                }

            }
        });

        let header = `
                <div id="controls-menu" class="horizontal-flex-menu">
                    <div class="flex-left">
                        <div class="menu-button-section">
                            <button style="display: block;" class="goBack">Назад</button>
                        </div>
                        <div style="margin-left: .5rem"><span> / </span></div>
                    </div>
                    <div class="flex-right">                      
                    </div>
                </div>
                <div class="basket-container" style="display: block;">
                    <div class="basket-box">`;
        let footer = '</div></div>';
        pms.workspace.wrapper.querySelector('.workspace-wrapper').innerHTML = header + output + footer;

        pms.workspace.wrapper.querySelector('.workspace-wrapper').addEventListener('click', function (event) {
            if (event.target.tagName === "BUTTON" && event.target.classList.contains('goBack')) {
                itemlist.requestGetDirectory(item.id);
            }
        });
    };

    itemlist.requestSaveItem = function (id, data) {
        return io('console/host/pluginRequest', {
            hostId: pms.selectedHost.id,
            requestPath: itemlist.apiPath + 'portfolio/edit/' + id,
            mode: 'post'
        }, data).then(function (response) {
            if (!response.status || !response.response) return false;
            alert('Элемент сохранен');
        });
    };

    itemlist.requestCreateItem = function (data) {
        return io('console/host/pluginRequest', {
            hostId: pms.selectedHost.id,
            requestPath: itemlist.apiPath + 'pms/portfolio/create',
            mode: 'post'
        }, data).then(function (response) {
            if (!response.status || !response.response) return false;
            alert('Элемент сохранен');
        });
    };

    itemlist.requestGetDirectory = function (directoryId) {
        let data = {};
        //--Заполнение шаблона заказа и вывод на страницу
        pms.workspace.wrapper.querySelector('.workspace-wrapper').addEventListener('click', function (event) {
            if (event.target.tagName === "BUTTON" && event.target.classList.contains('goBack')) {
                itemlist.requestListDirectories();
            }
        });

        return io('console/host/pluginRequest', {
            hostId: pms.selectedHost.id,
            requestPath: itemlist.apiPath + 'portfolio/listdirectory/' + directoryId,
            mode: 'get'
        }, data).then(function (response) {
            if (!response.status || !response.response) return false;
            itemlist.showItems(response.response);
        });
    };

    itemlist.eventGetDirectory = function (directoryId = null) {
        if (!directoryId) return false;
        itemlist.requestGetDirectory(directoryId);
    };

    itemlist.eventDeleteLegal = function (legalId = null) {
        if (!legalId) return false;
        itemlist.requestDeleteLegal = function (legalId) {
            let data = {};
            return io('console/host/pluginRequest', {
                hostId: pms.selectedHost.id,
                requestPath: itemlist.apiPath + 'legal/delete/' + legalId,
                mode: 'get'
            }, data).then(function (response) {
                if (!response.status || !response.response) return false;
                document.querySelector('li.list-item[data-id="' + response.response.data.id + '"]').remove();
            });
        };
        itemlist.requestDeleteLegal(legalId);
    };


    itemlist.eventChangeStatusLegal = function (legalId, status) {
        if (!legalId || !status) return false;

        itemlist.requestChangeStatusLegal = function (legalId, status) {
            let data = {
                'legal_id': legalId,
                'status': status
            };

            return io('console/host/pluginRequest', {
                hostId: pms.selectedHost.id,
                requestPath: itemlist.apiPath + 'legal/change-status',
                mode: 'post'
            }, data).then(function (response) {
                if (!response.status || !response.response) {
                    createNotification(pms.config.name, '<p>Ошибка изменения статуса</p>', pms.config.icon);
                    return false;
                }
                createNotification(pms.config.name, '<p>Статус заказа изменен</p>', pms.config.icon);
            });

        };

        itemlist.requestChangeStatusLegal(legalId, status);
    };


})();
