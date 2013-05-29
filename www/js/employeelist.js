// Wait for Cordova to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
//

function onDeviceReady() {
    
    checkConnection();
    //alert(durum);
    if(durum!='No'){
       
        sql();
    }else {
        //alert("geçti");
        $(".random").text('15');
        successCB();
    }
    
    $("#update").click(function () {
        sql();
    });
    
    
}


function checkConnection() {
    var networkState = navigator.network.connection.type;
    
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown';
    states[Connection.ETHERNET] = 'Ethernet';
    states[Connection.WIFI]     = 'WiFi';
    states[Connection.CELL_2G]  = '2G';
    states[Connection.CELL_3G]  = '3G';
    states[Connection.CELL_4G]  = '4G';
    states[Connection.NONE]     = 'No';
    
    return durum = states[networkState];
}


function sql() {
    $.ajax({
        type: 'GET',
        url: 'http://interdi.interdibase.com/site/phone',
        success: function(ajaxResponse) {
           $(".ajax").text(ajaxResponse);
           random();
        },
        error: function () {
           alert("ajax hata");
        }
    });
    
}



function random() {
    $.ajax({
        type: 'GET',
        url: 'http://interdi.interdibase.com/site/random',
        success: function(ajaxResponse) {
           $(".random").text(ajaxResponse);
           start();
        },
        error: function () {
           alert("random hata");
        }
    });
    
}
function start (){
    
    var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(populateDB, errorCB, successCB);
    
    
}


// Transaction error callback
//
function errorCB(err) {
    console.log("Error processing SQL: "+err.code);
}

// Transaction success callback
//
function successCB() {
    var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(queryDB, errorCB);
}


// Populate the database
//
function populateDB(tx) {
    var str = $(".ajax").text();
    var exploded = str.split('->');
    var uzunluk = exploded.length;
    //$(".ajax").remove();
    
    tx.executeSql('DROP TABLE IF EXISTS employee');
    var sql =
    "CREATE TABLE IF NOT EXISTS employee ( "+
    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "title VARCHAR(50), " +
    "img VARCHAR(50), " +
    "count INTEGER, " +
    "name VARCHAR(50), " +
    "person_img VARCHAR(80), " +
    "pleace VARCHAR(30), " +
    "number VARCHAR(200))";
    tx.executeSql(sql);
    
    
    
    for ( var i = 0; i< uzunluk; i++ )
    {
        
        tx.executeSql(exploded[i]);
    }
    //alert("Update Done!");
}

// Query the database
//
function queryDB(tx) {
    var randomSql = $(".random").text();
    tx.executeSql("SELECT * FROM employee WHERE ID="+randomSql+"", [], querySuccess, errorCB);} //
    //$(".random").remove();



// Query the success callback
//
function querySuccess(tx, results) {
    var len = results.rows.length;
    console.log("DEMO table: " + len + " rows found.");
    for (var i=0; i<len; i++){
        console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).title);
        $('.box-name').text(results.rows.item(i).title);
        $('.detail-image img').attr('src',results.rows.item(i).img);
        $('.user-info img').attr('src',results.rows.item(i).person_img);
        $('.user-info span').text(results.rows.item(i).name);
        $('.count').text(results.rows.item(i).count);
        $('.place').text(results.rows.item(i).pleace);
        $('.phone').text(results.rows.item(i).number);
    }
    
    
}
