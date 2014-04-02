
module('TableConverter');

var converter;
var expectedHeads = ["numero","Historias tarefas","Back","Front","SEO","QA"];
var expectedJSON = [{'numero':'35', 'Historias tarefas':'Publicação flip AN e SOL', 'Back':'', 'Front':'', 'SEO':'', 'QA':'7'},
                  {'numero':'35.1', 'Historias tarefas':'Criação da Gmud', 'Back':'7', 'Front':'7', 'SEO':'7', 'QA':'7'},
                  {'numero':'35.2', 'Historias tarefas':'Execução da Gmud', 'Back':'', 'Front':'', 'SEO':'', 'QA':''}];

QUnit.testStart(function( details ) {
  console.log( "Now running: ", details.module, details.name );
  
  converter = new TableConverter();  
});

/* Should get the row's headings */
test('should return headings whithout thead', function(){

  var table = $(
      '<table id="test-table">' +
        '<tr>' +
          '<th>numero</th>' +
          '<th>Historias tarefas</th>' +
          '<th>Back</th>' +
          '<th>Front</th>' +
          '<th>SEO</th>' +
          '<th>QA</th>' +
        '</tr>' +
        '<tr>' +
            '<td>35</td>' +
            '<td>Publicação flip AN e SOL</td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td>7</td>' +
          '</tr>' +
      '</table>'
    );

  assertHeadings(table, expectedHeads);
});

/* Should get the row's headings */
test('should return headings whith thead', function(){

  var table = $(
      '<table id="test-table">' +
        '<thead>' +
          '<tr>' +
            '<th>numero</th>' +
            '<th>Historias tarefas</th>' +
            '<th>Back</th>' +
            '<th>Front</th>' +
            '<th>SEO</th>' +
            '<th>QA</th>' +
          '</tr>' +
        '</thead>' +
        '<tbody>' +
          '<tr>' +
            '<td>35</td>' +
            '<td>Publicação flip AN e SOL</td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td>7</td>' +
          '</tr>' +
        '</tbody>' + 
      '</table>'
    );

  assertHeadings(table, expectedHeads);
});

/* Should get the row's headings */
test('should return headings with td as columns instead of th', function(){
  var table = $(
      '<table id="test-table">' +
        '<tr>' +
          '<td>numero</td>' +
          '<td>Historias tarefas</td>' +
          '<td>Back</td>' +
          '<td>Front</td>' +
          '<td>SEO</td>' +
          '<td>QA</td>' +
        '</tr>' +
        '<tr>' +
            '<td>35</td>' +
            '<td>Publicação flip AN e SOL</td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td>7</td>' +
          '</tr>' +
      '</table>'
    );
  
  assertHeadings(table, expectedHeads);

});

/* Should convert to JSON */
test('should convert the html table to json', function() {
  var table = $(
      '<table id="test-table">' +
        '<tr>' +
          '<th>numero</th>' +
          '<th>Historias tarefas</th>' +
          '<th>Back</th>' +
          '<th>Front</th>' +
          '<th>SEO</th>' +
          '<th>QA</th>' +
        '</tr>' +
        '<tr>' +
            '<td>35</td>' +
            '<td>Publicação flip AN e SOL</td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td>7</td>' +
          '</tr>' +
          '<tr>' +
            '<td>35.1</td>' +
            '<td>Criação da Gmud</td>' +
            '<td>7</td>' +
            '<td>7</td>' +
            '<td>7</td>' +
            '<td>7</td>' +
          '</tr>' +
          '<tr>' +
            '<td>35.2</td>' +
            '<td>Execução da Gmud</td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
          '</tr>' +
      '</table>'
    );

  assertJSON(table, expectedJSON);
});

var assertJSON = function(table, expected){
  deepEqual(converter.htmlToJSON(table), expected);
};

var assertHeadings = function(table, expected){
  var headings = converter.getHeadings(table);
  deepEqual(headings, expected);  
};

