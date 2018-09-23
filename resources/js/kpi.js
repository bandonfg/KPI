

// display specified panel 
// Params showPanel => 1 show RPO KPI Panel, 2 show Safety KPI Panel
function showPanel(showPanel) {

    // alert("Display Panel " + showPanel);
    var panel1 = document.getElementById("panel1");
    var panel2 = document.getElementById("panel2");

    if (showPanel === 1) {
        panel1.style.display = "block";
        panel2.style.display = "none";
    
    } else {
        panel2.style.display = "block";
        panel1.style.display = "none";
    }
}


function getLSWrtrLabel(chartVal)
{
    var retVal = "";
    if (chartVal >= 50 && chartVal <= 100)
    {
        retVal = "Outstanding";
    }
    else if (chartVal >= 40 && chartVal <= 49)
    {
        retVal = "Excellent";
    }
    else if (chartVal >= 31 && chartVal <= 39) {
        retVal = "Good";
    }
    else if (chartVal >= 0 && chartVal <= 29) {
        retVal = "Poor";
    }

    return retVal;
}

function getMTVSSILabel(chartVal) {
    var retVal = "";
    if (chartVal >= 51 && chartVal <= 100) {
        retVal = "Poor";
    }
    else if (chartVal >= 34 && chartVal <= 49) {
        retVal = "Good";
    }
    else if (chartVal >= 20 && chartVal <= 35) {
        retVal = "Excellent";
    }
    else if (chartVal >= 0 && chartVal <= 19) {
        retVal = "Outstanding";
    }

    return retVal;
}

function getNDEBILabel(chartVal) {
    var retVal = "";
    if (chartVal >= 96 && chartVal <= 100) {
        retVal = "Outstanding";
    }
    else if (chartVal >= 91 && chartVal <= 95) {
        retVal = "Excellent";
    }
    else if (chartVal >= 81 && chartVal <= 90) {
        retVal = "Very Good";
    }
    else if (chartVal >= 71 && chartVal <= 80) {
        retVal = "Good";
    }
    else if (chartVal >= 0 && chartVal <= 70) {
        retVal = "Poor";
    }

    return retVal;
}


    

document.addEventListener("DOMContentLoaded", function(event) {

    var rpoLumpsum = 0;
    var rpoWURTUR = 0;
    var mtvFldData = 0;
    var ssiFldData = 0;

    var ndeNinety = 0;
    var ndeHundred = 0;
    var biNinety = 0;
    var biHundred = 0;
    var vo = 0;
    var activePanel = 1;
    var panelInterval;



    $(document).ready(function() {      

        // initially display panel 1
        showPanel(activePanel);

        // --------------------------------------------------------------    
        // play | pause routine
        // --------------------------------------------------------------
        // glyphicon glyphicon-play
        // glyphicon glyphicon-pause
        $('#playStopButton').on('click', function () {
            var iSelector = $(this).find('i:first');
            if (iSelector.hasClass('glyphicon glyphicon-play')) {
                // play button clicked, replace play icon with pause icon
                iSelector.removeClass('glyphicon glyphicon-play')
                iSelector.addClass('glyphicon glyphicon-pause')
        
                // enable interval of panel display 
                panelInterval = setInterval( function() {
                    showPanel(activePanel);
                    if (activePanel == 1) {
                        activePanel = 2;
                    } else {
                        activePanel = 1;
                    }
                }, 5000 );

            } else if (iSelector.hasClass('glyphicon glyphicon-pause')) {
                // pause button clicked, replace pause icon with play icon
                iSelector.removeClass('glyphicon glyphicon-pause')
                iSelector.addClass('glyphicon glyphicon-play')

                // stop interval
                clearInterval(panelInterval);
                
            }
        });

    });	


    // get value of input fields when submit button is clicked
    document.getElementById('submitKPIButton').addEventListener('click', function () {

        // get field value
        rpoLumpsum = document.getElementById('rpoLumpSumData').value;
        rpoWURTUR = document.getElementById('rpoWURTURData').value;
        mtvFldData = document.getElementById('mtvData').value;
        ssiFldData = document.getElementById('ssiData').value;

        ndeNinety = document.getElementById('ndeNinetyData').value;
        ndeHundred = document.getElementById('ndeHundredData').value;
        biNinety = document.getElementById('biNinetyData').value;
        biHundred = document.getElementById('biHundredData').value;
        vo = document.getElementById('voData').value;

        // initialize or refresh kpi chart
        kpiLumpsum.refresh(rpoLumpsum);
        kpiWURTUR.refresh(rpoWURTUR);
        kpiMTV.refresh(mtvFldData);
        kpiSSI.refresh(ssiFldData);

        kpiNDENinety.refresh(ndeNinety);
        kpiNDEHundred.refresh(ndeHundred);
        kpiBINinety.refresh(biNinety);
        kpiBIHundred.refresh(biHundred);
        kpiVO.refresh(vo);

        
        // KPI Labels
        // Lumpsum, WURTUR, MTV, and SSI Labels
        jQuery("label[for='kpiLSLabel']").html(getLSWrtrLabel(rpoLumpsum));
        jQuery("label[for='kpiWURTURLabel']").html(getLSWrtrLabel(rpoWURTUR));
        jQuery("label[for='kpiMTVLabel']").html(getMTVSSILabel(mtvFldData));
        jQuery("label[for='kpiSSILabel']").html(getMTVSSILabel(ssiFldData));

        // NDE, BI for 90 and 100% Labels
        jQuery("label[for='kpiNDENinetyLabel']").html(getNDEBILabel(ndeNinety));
        jQuery("label[for='kpiNDEHundredLabel']").html(getNDEBILabel(ndeHundred));
        jQuery("label[for='kpiBINinetyLabel']").html(getNDEBILabel(biNinety));
        jQuery("label[for='kpiBIHundredLabel']").html(getNDEBILabel(biHundred));
        jQuery("label[for='kpiVOLabel']").html(getNDEBILabel(vo));


    });
    // end of document.getElementById('submitKPIButton').addEventListener('click'

    // LumpSum JustGage configuration
    var kpiLumpsum = new JustGage({
    id: 'kpiLumpsum',
    value: 0,
    min: 0,
    max: 100,
    customSectors : [{"lo":0, "hi":30,"color":"#E74C3C"},
                        {"lo":31,"hi":39,"color":"#F39C12"},
                        {"lo":40,"hi":49,"color":"#F9E79F"},
                        { "lo": 51, "hi": 100, "color": "#2ECC71" }],
    levelColorsGradient: false,
    symbol: '%',
    pointer: true,
    gaugeWidthScale: 0.6,
    counter: true,
    title: "Lumpsum"
    });


    // WURTUR JustGage configuration
    var kpiWURTUR = new JustGage({
        id: 'kpiWURTUR',
        value: 0,
        min: 0,
        max: 100,
        customSectors: [{ "lo": 0, "hi": 30, "color": "#E74C3C" },
                { "lo": 31, "hi": 39, "color": "#F39C12" },
                { "lo": 40, "hi": 49, "color": "#F9E79F" },
                { "lo": 51, "hi": 100, "color": "#2ECC71" }],
        levelColorsGradient: false,
        symbol: '%',
        pointer: true,
        gaugeWidthScale: 0.6,            
        counter: true,
        title: "WURTUR"
    });

    // MTV JustGage configuration
    var kpiMTV = new JustGage({
        id: 'kpiMTV',
        value: 0,
        min: 0,
        max: 100,
        customSectors: [{ "lo": 51, "hi": 100, "color": "#E74C3C" },
                { "lo": 36, "hi": 49, "color": "#F39C12" },
                { "lo": 20, "hi": 35, "color": "#F9E79F" },
                { "lo": 0, "hi": 19, "color": "#2ECC71" }],
        levelColorsGradient: false,
        symbol: '%',
        pointer: true,
        gaugeWidthScale: 0.6,          
        counter: true,
        title: "Motor Traffic Violation"
    });


    // SSI JustGage configuration
    var kpiSSI = new JustGage({
        id: 'kpiSSI',
        value: 0,
        min: 0,
        max: 100,
        customSectors: [{ "lo": 51, "hi": 100, "color": "#E74C3C" },
                { "lo": 36, "hi": 49, "color": "#F39C12" },
                { "lo": 20, "hi": 35, "color": "#F9E79F" },
                { "lo": 0, "hi": 19, "color": "#2ECC71" }],
        levelColorsGradient: false,
        symbol: '%',
        pointer: true,
        gaugeWidthScale: 0.6,
        counter: true,
        title: "Site Safety Inspection"
    });

    // NDE 90 JustGage configuration
    var kpiNDENinety = new JustGage({
        id: 'kpiNDENinety',
        value: 0,
        min: 0,
        max: 100,
        customSectors: [{ "lo": 96, "hi": 100, "color": "#196F3D" },
                { "lo": 91, "hi": 95, "color": "#7DCEA0" },
                { "lo": 81, "hi": 90, "color": "#F7DC6F" },
                { "lo": 71, "hi": 80, "color": "#F39C12" },
                { "lo": 0, "hi": 70, "color": "#E74C3C" }],
        levelColorsGradient: false,
        symbol: '%',
        pointer: true,
        gaugeWidthScale: 0.6,
        counter: true,
        title: "NDE 90%"
    });

    // NDE 100 JustGage configuration
    var kpiNDEHundred = new JustGage({
        id: 'kpiNDEHundred',
        value: 0,
        min: 0,
        max: 100,
        customSectors: [{ "lo": 96, "hi": 100, "color": "#196F3D" },
                { "lo": 91, "hi": 95, "color": "#7DCEA0" },
                { "lo": 81, "hi": 90, "color": "#F7DC6F" },
                { "lo": 71, "hi": 80, "color": "#F39C12" },
                { "lo": 0, "hi": 70, "color": "#E74C3C" }],
        levelColorsGradient: false,
        symbol: '%',
        pointer: true,
        gaugeWidthScale: 0.6,
        counter: true,
        title: "NDE 100%"
    });
    

    // BI 90 JustGage configuration
    var kpiBINinety = new JustGage({
        id: 'kpiBINinety',
        value: 0,
        min: 0,
        max: 100,
        customSectors: [{ "lo": 96, "hi": 100, "color": "#196F3D" },
                { "lo": 91, "hi": 95, "color": "#7DCEA0" },
                { "lo": 81, "hi": 90, "color": "#F7DC6F" },
                { "lo": 71, "hi": 80, "color": "#F39C12" },
                { "lo": 0, "hi": 70, "color": "#E74C3C" }],
        levelColorsGradient: false,
        symbol: '%',
        pointer: true,
        gaugeWidthScale: 0.6,
        counter: true,
        title: "BI 90%"
    });

    // BI JustGage configuration
    var kpiBIHundred = new JustGage({
        id: 'kpiBIHundred',
        value: 0,
        min: 0,
        max: 100,
        customSectors: [{ "lo": 96, "hi": 100, "color": "#196F3D" },
                { "lo": 91, "hi": 95, "color": "#7DCEA0" },
                { "lo": 81, "hi": 90, "color": "#F7DC6F" },
                { "lo": 71, "hi": 80, "color": "#F39C12" },
                { "lo": 0, "hi": 70, "color": "#E74C3C" }],
        levelColorsGradient: false,
        symbol: '%',
        pointer: true,
        gaugeWidthScale: 0.6,
        counter: true,
        title: "BI 100%"

    });

    // VO JustGage configuration
    var kpiVO = new JustGage({
        id: 'kpiVO',
        value: 0,
        min: 0,
        max: 100,
        customSectors: [{ "lo": 96, "hi": 100, "color": "#196F3D" },
                { "lo": 91, "hi": 95, "color": "#7DCEA0" },
                { "lo": 81, "hi": 90, "color": "#F7DC6F" },
                { "lo": 71, "hi": 80, "color": "#F39C12" },
                { "lo": 0, "hi": 70, "color": "#E74C3C" }],
        levelColorsGradient: false,
        symbol: '%',
        pointer: true,
        gaugeWidthScale: 0.6,
        counter: true,
        title: "Variation Order"

    });

});