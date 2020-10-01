function Get_Rows(row,column) //Получаем количество строк в которых есть данные
 {
  var LastRow = sheet.getRange(row,column).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow();
  return LastRow
 };

function Engine (sheet, rowNum) //Получаем количество столбцов в которых есть данные по каждой строке и делаем расчеты
{
    
  var last_col = 3;
  var log = '';
  var column = 2400 // Этой переменной задаем количество колонок
  var arr_of_avarege = [];
  var arr_for_each_cell = []; 
  for(var index_row = 0; index_row < rowNum; index_row++)
      {
       var range_base_on_rows = sheet.getRange(2, 3, rowNum, column).getValues()[index_row];
       var last_col_by_row =  range_base_on_rows.length;
       var counter_for_col = 0; 
       var avarege = 0;
 
        for(counter_for_col; counter_for_col < last_col_by_row; counter_for_col++) 
        {
          var cells_value = range_base_on_rows[counter_for_col]
          var triger = cells_value.toString().length 
          if(triger > 0)
          {
            arr_for_each_cell.push(cells_value)
            var log = log  + ' _ строка - <'+ (index_row + 2) + '> _колонока - <' + (counter_for_col  +3) + '> _значение - <' + cells_value + '> ||';
          }
          else
          {
            counter_for_col = last_col_by_row + 1;
            var limit = arr_for_each_cell.length-1;
            if(limit>=3)
            {
             var avarege = (0 + arr_for_each_cell[limit] + arr_for_each_cell[limit-1] + arr_for_each_cell[limit-2] + arr_for_each_cell[limit-3])/4;
             arr_of_avarege.push(avarege)
             arr_for_each_cell = []
            }
            
            else if(limit==2)
            {
             var avarege = (0 + arr_for_each_cell[limit] + arr_for_each_cell[limit-1] + arr_for_each_cell[limit-2])/3;
             arr_of_avarege.push(avarege)
             arr_for_each_cell = []
            }
            else if(limit==1)
            {
              var avarege = (0 + arr_for_each_cell[limit] + arr_for_each_cell[limit-1])/2;
              arr_of_avarege.push(avarege)
              arr_for_each_cell = []
            }
            else if(limit==0)
            {
              arr_of_avarege.push(arr_for_each_cell[limit])
              arr_for_each_cell = []
            }
            else if(limit==-1)
            {
              arr_of_avarege.push(0)
              arr_for_each_cell = []
            };
            
          };

        };        
      
      };
  for(var index_row = 0; index_row < rowNum-1; index_row++)
  {
    sheet.getRange((index_row+2),2).setValue(arr_of_avarege[index_row])
  }
}



function Main() 
 {
  console.log();
  app =SpreadsheetApp;
  ss = app.getActiveSpreadsheet();
  sheet = ss.getActiveSheet(); 
  var work_rows = Get_Rows(1,1);
  Engine(sheet, work_rows); 
  
  b=1;
     
 };

