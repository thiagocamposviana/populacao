function generateTable()
{
    var tableRows = '';
    for( var index in total_faixas['ANO'] )
    {
        var year = total_faixas['ANO'][index];
        var totalYear = total_faixas['Total'][index];
        var totalStudents = 0;
        $('.faixas .estudantes input[type="checkbox"]').each(function(){
            if( $(this).is(':checked') ) {
                totalStudents += total_faixas[$(this).val()][index];
            }
        });
        var totalWorkers = 0;
        $('.faixas .trabalhadores input[type="checkbox"]').each(function(){
            if( $(this).is(':checked') ) {
                totalWorkers += total_faixas[$(this).val()][index];
            }
        });
        var totalRetired = 0;
        $('.faixas .aposentados input[type="checkbox"]').each(function(){
            if( $(this).is(':checked') ) {
                totalRetired += total_faixas[$(this).val()][index];
            }
        });
        tableRows += `
                        <tr>
                            <td>${year}</td>
                            <td>${( totalStudents*100 / totalYear ).toFixed(2)}%</td>
                            <td>${( totalWorkers*100 / totalYear ).toFixed(2)}%</td>
                            <td>${( totalRetired*100 / totalYear ).toFixed(2)}%</td>
                            <td>${( totalWorkers/totalRetired ).toFixed(2)}</td>
                            <td>${( (totalYear-totalWorkers)/totalWorkers ).toFixed(2)}</td>
                        </tr>`;
        
    }
    $('.result').html('<table class="table"><thead><th>Ano</th><th>Estudantes</th><th>Trabalhadores</th><th>Aposentados</th><th>Trabalhadores/Aposentado</th><th>Não Trabalhadores/Trabalhador</th></thead>' + tableRows + '</table>');

}

$( document ).ready(function() {
     $('.faixas input[type="checkbox"]').change(function() {
        var currentElem = this;
        $('.faixas input[type="checkbox"][value="' + $(this).val() + '"]').each(function(){
            if ( $(currentElem).is(':checked') && !$(this).is(':checked') ) {
                $(this).prop( "disabled", true );
            }
            else if( !$(currentElem).is(':checked') )
            {
                $(this).prop( "disabled", false );
            }
        });
    });
    $('.faixas button[type="submit"]').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        generateTable();
    });
});