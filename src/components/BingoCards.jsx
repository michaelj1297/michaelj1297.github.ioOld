import React, { useState, useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import html2canvas from "html2canvas";

import jsPDF from 'jspdf'


//const pdf = new jsPDF("p", "mm", "a4");

//40

var cardGenSettings = {
    valueRange: [0, 75],
    letters: ["B", "I", "N", "G", "O"],
    rows: 5,
    center: "free",
    cardsPerPage: 1,
    centerVal: "FREE",
    cardLoadDelay: 200, // Delay between when each card is loaded for HTML2Canvas
    onePageCardGenMethod: false,
    batchNum: 1
}


var bingoCardData = []



function BingoCards(props) {
    return (<CardGenSettings />)
}


// const PDFPage2 = () => (
//     <div>
//         <h3>Time & Materials Statement of Work!!!!!!!!!!!!! (SOW) </h3>
//         <h4>General Information</h4>
//         <table id="tab_customers" class="table table-striped" >
//             <colgroup>
//                 <col span="1" />
//                 <col span="1" />
//             </colgroup>
//             <thead>
//                 <tr class="warning">
//                     <th>SOW Creation Date</th>
//                     <th>SOW Start Date</th>
//                     <th>Project</th>
//                     <th>Last Updated</th>
//                     <th>SOW End Date</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 <tr>
//                     <td>Dec 13, 2017</td>
//                     <td>Jan 1, 2018</td>
//                     <td>NM Connect - NMETNMCM</td>
//                     <td>Dec 13, 2017</td>
//                     <td>Dec 31, 2018</td>
//                 </tr>
//             </tbody>
//         </table>

//     </div>
// );




const PDFPage = () => (
    <div>
        <h3>Time & Materials Statement of Work!!!!!!!!!!!!! (SOW) </h3>
        <h4>General Information</h4>
    </div>
);

let pdf = new jsPDF('p', 'px', 'a4');
pdf.deletePage(1);

function generatePdf() {

    var target = document.getElementById('PDFTarget');

    const printfromRenderedString = async () => {
        const string = renderToString(<>
            <PDFPage />

        </>);

        console.log("test: ", string)


        const opt = {
            callback: function (pdf) {
                pdf.save("Test.pdf");
                // to open the generated PDF in browser window
                // window.open(jsPdf.output('bloburl'));
            },
            margin: [10, 10, 0, 10],
            autoPaging: 'text',
            html2canvas: {
                allowTaint: true,
                dpi: 300,
                letterRendering: true,
                logging: false,
                scale: 1
            }
        };
        pdf.html(string, opt);


        // pdf.html(string).then(() => pdf.save('test.pdf'))


        console.log("test: ", pdf)

        // pdf.save("pdf");
    };
    //printfromRenderedString();


    function printWithHTML2Canvas() {
        //var target = document.getElementById('PDFTarget');//document.body

        // const renderedString = renderToString(<>
        //     <CardPage cardIDs={[1, 2, 3, 4]} />
        // </>);

        // pdf.html(renderedString).then(() => pdf.save('test.pdf'))

        html2canvas(target, {
            useCORS: true,
            allowTaint: true
            //dpi: 1600
            // letterRendering: true,
            // logging: false,
            // scale: 1

        }).then(function (canvas) {
            //canvas.width = target.clientWidth;
            //var jpegUrl = canvas.toDataURL("image/jpeg");

            var imgData = canvas.toDataURL("image/png");

            //     console.log("here!!!!!")
            //     var width = canvas.width;
            //     var height = canvas.height;

            //     console.log("here!!!!!")

            //     var millimeters = {};
            //     millimeters.width = Math.floor(width * 0.264583);
            //     millimeters.height = Math.floor(height * 0.264583);
            //     console.log("here!!!!!")


            //    /// var pdf = new jsPDF("p", "mm", "a4");
            //     pdf.deletePage(1);
            //     pdf.addPage(millimeters.width, millimeters.height);
            //     pdf.addImage(imgData, 'PNG', 0, 0);

            //     console.log("here!!!!!")

            //     pdf.save('WebSiteScreen.pdf');
            //     console.log("here!!!!!")


            // var width =  80/100 * pdf.internal.pageSize.getWidth();
            // var height =  80/100 * pdf.internal.pageSize.getHeight();
            console.log("Adding page")
            pdf.addPage("a4", "p");

            var pageWidth = pdf.internal.pageSize.getWidth();
            var pageHeight = pdf.internal.pageSize.getHeight();

            const widthRatio = pageWidth / canvas.width;
            const heightRatio = pageHeight / canvas.height;
            const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
            //https://stackoverflow.com/questions/60953089/how-to-fit-an-image-in-the-center-of-a-page-using-jspdf
            const canvasWidth = canvas.width * ratio;
            const canvasHeight = canvas.height * ratio;


            const marginX = (pageWidth - canvasWidth) / 2;
            const marginY = (pageHeight - canvasHeight) / 2;

            //const marginX = 50
            // const marginY = 100

            console.log("Mrginx Test: ", pageWidth, canvasWidth, marginX)
            console.log("Mrginx Test: ", pageWidth, canvasWidth, marginX)



            //  pdf.addImage(imgData, 'PNG', 0, 0, width, height);
            pdf.addImage(imgData, 'PNG', marginX, marginY, canvasWidth, canvasHeight);


            // pdf.save('download.pdf',opt);

            //     console.log("jpegUrl: ",jpegUrl)
            //    // pdf.addImage(jpegUrl, 'JPEG', 10, 10,180, 150 );

            //     console.log("pdf: ",pdf);

            //     pdf.save('sample-file.pdf');


            //jpegUrl.length.




            /* pdf.addImage(jpegUrl, 'JPEG', 10, 10);
             pdf.save('sample-file.pdf');*/
        });
    }


    if (!cardGenSettings.onePageCardGenMethod) {
        var targetArr = document.querySelectorAll("#PDFTarget")

        targetArr.forEach(element => {
            target = element
            printWithHTML2Canvas();
        });
        try {
            document.getElementById("savePDFBtn").style.visibility = "visible";
        } catch {

        }
    } else {
        printWithHTML2Canvas();

    }



    const printfromRenderedDom = () => {
        let jsPdf = new jsPDF('p', 'pt', 'letter');
        var htmlElement = document.getElementById('PDFTarget');
        // you need to load html2canvas (and dompurify if you pass a string to html)
        const opt = {
            callback: function (jsPdf) {
                jsPdf.save("Test.pdf");
                // to open the generated PDF in browser window
                // window.open(jsPdf.output('bloburl'));
            },

            margin: [0, 50, 0, 50],
            autoPaging: 'text',
            html2canvas: {
                allowTaint: true,
                dpi: 300,
                letterRendering: true,
                logging: false,
                scale: 1
            }
        };
        console.log("test!!!", htmlElement);
        jsPdf.html(htmlElement, opt);
    }


    // const string = renderToString(<PDFPage />);
    // const pdf = new jsPDF("p", "mm", "a4");

    // pdf.html(string);

    // console.log
    // pdf.save("pdf");



    // html2canvas(target).then(function (canvas) {
    //     //canvas.width = target.clientWidth
    //     var jpegUrl = canvas.toDataURL("image/jpeg");
    //     //var doc = new jsPDF('l', 'mm', [318, 210]);

    //     let pdf = new jsPDF('p', 'pt', 'letter');
    //     const opt = {
    //         callback: function (pdf) {
    //             pdf.save("Test.pdf");
    //             // to open the generated PDF in browser window
    //             // window.open(jsPdf.output('bloburl'));
    //         },
    //         margin: [50, 50, 0, 50],
    //         autoPaging: 'text',
    //         html2canvas: {
    //             allowTaint: true,
    //             dpi: 300,
    //             letterRendering: true,
    //             logging: false,
    //             scale: .8
    //         }
    //     };


    //     pdf.html(canvas, opt);



    //     // pdf.addImage(jpegUrl, 'JPEG', 10, 10);
    //     //pdf.save('sample-file.pdf');







    //     /* pdf.addImage(jpegUrl, 'JPEG', 10, 10);
    //      pdf.save('sample-file.pdf');*/
    // });

}





var showSavePDFBtn = false;



function CardGenSettings() {

    const [cardsGen, setcardsGen] = useState(false);
    const [cardIdarray, setCardIdarray] = useState([]);


    //const [cardsPerPage, setcardsPerPage] = useState(1);


    var cardsPerPage = cardGenSettings.cardsPerPage;

    async function PrepJSPDF(params) {

        if (cardsGen) {
            var c = 1;

            var x = Math.floor(bingoCardData.length / cardsPerPage)// + ();
            var y = bingoCardData.length % cardsPerPage;


            function setarrayOfCardID(_tempCardIdarray, timer) {
                setTimeout(async () => {
                    console.log(timer, "setCardIdarray ", _tempCardIdarray)
                    setCardIdarray(_tempCardIdarray);
                    showSavePDFBtn = true;
                }, timer);
            }





            var timer = 1000
            for (let pageNum = 1; pageNum <= x; pageNum++) {
                var tempCardIdarray = [];
                // console.log("pageNum: ", pageNum);
                for (let c = (pageNum - 1) * cardsPerPage; c < (pageNum) * cardsPerPage; c++) {
                    tempCardIdarray.push(c)
                }
                setarrayOfCardID(tempCardIdarray, timer);
                timer += cardGenSettings.cardLoadDelay;
                console.log(pageNum, "val: ", tempCardIdarray);
            }



        }
    }


    function beginCardGen() {
        var cardAmt = document.getElementById("npt_Amt").value;
        var npt_batchNum = document.getElementById("npt_BatchNum").value;

        // cardsPerPage = document.getElementsByName("cardsPerPAge")
        //var cardsPerPAge;
        for (var radio of document.getElementsByName("cardsPerPAge")) {
            if (radio.checked) {
                //setcardsPerPage(radio.value);
                cardGenSettings.cardsPerPage = parseInt(radio.value);
            }
        }
        cardsPerPage = cardGenSettings.cardsPerPage;
        if (/^\d+$/.test(cardAmt) && typeof (cardsPerPage) == 'number' && /^\d+$/.test(cardsPerPage) && /^\d+$/.test(npt_batchNum)) {

        cardGenSettings.batchNum = parseInt(npt_batchNum); 

            setcardsGen(generateCardData(Number(cardAmt), Number(cardsPerPage)));

        } else {
            console.error("Invalid value type for 'cardsPerPage' or 'cardAmt'")

        }

        //console.log("test", /^\d+$/.test(cardAmt))


    };

    useEffect(() => {

        if (cardsGen && !cardGenSettings.onePageCardGenMethod) {
            // printTest()

            // pdf.save('download.pdf',opt);

            generatePdf();
        }
    }, [cardsGen]);

    useEffect(() => {
        if (cardsGen && cardIdarray.length >= 1) {
            // printTest()

            // pdf.save('download.pdf',opt);

            generatePdf();
        }



    }, [cardIdarray]);


    if (cardsGen && cardIdarray.length < 1 && cardGenSettings.onePageCardGenMethod) {
        PrepJSPDF();
    }
    if (cardIdarray.length >= 1 && cardGenSettings.onePageCardGenMethod) {
        return (<CardPage cardIDs={cardIdarray} />);
    }

    if (cardsGen && !cardGenSettings.onePageCardGenMethod) {
        return (<CardPage cardIDs={[0]} fullCardIDs={bingoCardData} />);
    }

    //const mountNode =  contentRef?.contentWindow?.document?.body
    return (
        <div class="container">
            <div class="row d-flex justify-content-cente pb-5">
                <div class="col-4"></div>
                <div class="col-4">
                    <label for="basic-url" class="form-label">Card Settings</label>
                </div>
            </div>

            <div class="row d-flex justify-content-cente">
                <div class="col-4"></div>
                <div class="col-3">

                    <div class="input-group mb-3">
                        <label class="input-group-text" for="basic-url" id="lbl_Amt">Amount of Cards: </label>
                        <input type="text" class="form-control" id="npt_Amt" aria-describedby="basic-addon3"  maxLength={'3'}/>
                    </div>
                </div>
                <div class="col-5"></div>

            </div>
            <div class="row d-flex justify-content-cente">
                <div class="col-4"></div>
                <div class="col-4" >

                    <div class="input-group mb-3">
                        <label class="input-group-text" for="cardsPerPAge1" id="lbl_AmtPerPAge">Amount Per Page: </label>
                        <div class="input-group-text">
                            {/* <label class="input-group-text" for="cardsPerPAge1" id="basic-addon3">1: </label> */}

                            <input name="cardsPerPAge" id="cardsPerPAge1" class="form-check-input mt-0" type="radio" value="1" aria-label="Checkbox for following text input" />
                        </div>

                        <div class="input-group-text">
                            {/* <label class="input-group-text" for="cardsPerPAge2" id="basic-addon3">2: </label> */}
                            <input name="cardsPerPAge" id="cardsPerPAge2" class="form-check-input mt-0" type="radio" value="2" aria-label="Checkbox for following text input" />
                        </div>

                        <div class="input-group-text">
                            {/* <label class="input-group-text" for="cardsPerPAge3" id="basic-addon3">2: </label>                           */}
                            <input name="cardsPerPAge" id="cardsPerPAge3" class="form-check-input mt-0" type="radio" value="3" aria-label="Checkbox for following text input" />
                        </div>

                        <div class="input-group-text">
                            {/* <label class="input-group-text" for="cardsPerPAge4" id="basic-addon3">2: </label>  */}
                            <input name="cardsPerPAge" id="cardsPerPAge4" defaultChecked class="form-check-input mt-0" type="radio" value="4" aria-label="Checkbox for following text input" />
                        </div>

                    </div>

                </div>
           
                <div class="col-2"></div>

            </div>
            <div class="row d-flex justify-content-cente">
                <div class="col-4"></div>
                <div class="col-3">
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="basic-url" id="lbl_Amt">Batch Number: </label>
                        <input type="text" class="form-control" id="npt_BatchNum" aria-describedby="basic-addon3" maxLength={'15'}/>
                    </div>

                </div>
                <div class="col-5"></div>

            </div>


            <div class="row d-flex justify-content-cente">
                <div class="col-5"></div>
                <div class="col-2">
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => beginCardGen()}>Generate</button>

                </div>
                <div class="col-5"></div>

            </div>


        </div>
    );


}


function generateCardData(cardAmt, cardsPerPAge) {
    if (!(typeof (cardAmt) == "number" && typeof (cardsPerPAge) == "number")) {
        console.error("Type mismatch in generateCardData()!");
        return false;
    }

    function generateNumber(letter, row) {
        var returnval;

        switch (letter) {
            case "B":
                returnval = Math.floor(Math.random() * (15 - 1)) + 1;
                break;
            case "I":
                returnval = Math.floor(Math.random() * (30 - 16)) + 16;

                break;
            case "N":
                returnval = Math.floor(Math.random() * (45 - 31)) + 31;

                break;
            case "G":
                returnval = Math.floor(Math.random() * (60 - 46)) + 46;

                break;
            case "O":
                returnval = Math.floor(Math.random() * (75 - 61)) + 61;

                break;

            default:
                returnval = "N/A" //testing
                break;
        }
        return returnval;

    }



    for (let x = 0; x < cardAmt; x++) {
        var tempbingoCardData = {};
        var valid = false;
        var tempNum;
        var safecount;
        cardGenSettings.letters.forEach((letter, index) => {
            tempbingoCardData[letter] = [];

            for (let c = 0; c < cardGenSettings.rows; c++) {
                tempNum = 0;
                safecount = 0;
                valid = false;

                if (letter == 'N' && c == 2) {
                    tempbingoCardData[letter].push(cardGenSettings.centerVal);


                } else {
                    while (!valid) {
                        tempNum = generateNumber(letter, c);

                        valid = !tempbingoCardData[letter].includes(tempNum);

                    }

                    tempbingoCardData[letter].push(tempNum);
                }


            }
        });
        // for (let c = 0; c < cardFormat.rows; c++) {
        //     tempbingoCardData.forEach((letter, index) => {
        //         tempbingoCardData[letter].push(generateNumber(letter, c));


        //     });

        // }


        bingoCardData.push(tempbingoCardData)
    }

    console.log("Cards Generated ", bingoCardData);
    return true;
}



// const print = async () => {
//     const string = renderToString(<>
//         <PDFPage />
//         <div>testing</div>
//     </>);

//     console.log("test: ", string)
//     pdf.html(string).then(() => pdf.save('test.pdf'))


//     console.log("test: ", pdf)

//     // pdf.save("pdf");
// };
































function CardPage(props) {
    var cardIds = props.cardIDs;
    var fullCardIDs = props.fullCardIDs;
    var pageArray = []





    console.log("Test", fullCardIDs)

    //(pageNum - 1) * cardsPerPage = x;
    var pageNum = (cardIds[0] / cardGenSettings.cardsPerPage) + 1;




    var now = new Date().toLocaleString().replace(",", "").replace(/:.. /, " ").replace(":", ".").replace("/", ".");

    function printPDF() {
        // generatePdf();

        //BingoCards 4_20_2023 7_41 PM.pdf

        //now.f
        // now.format("dd/MM/yyyy hh:mm TT");

        pdf.save(`BingoCards ${now}.pdf`);
    }
    // print();

    var cardW = "25px";

    var cardPadding = "5%"//, 0%, 10%, 60%";


    function GetCardPage(props) {
        var index = props.index
        cardIds = props.index;
        var pageNum = (cardIds[0] / cardGenSettings.cardsPerPage) + 1;

        // if (!cardGenSettings.onePageCardGenMethod) {
        //     //fullCardIDs



        //     return (<>
        //         "hiiii"

        //     </>)

        // }


        return (<div class="row pb-3 pt-3" style={{ border: "1px solid black" }}>
            <div class="col-2"></div>
            <div id="PDFTarget" class="col-8">
                <div class="row " >
                    <div class="col-1"></div>
                    <div class="col">
                        <h3><b>Sample Event BINGO</b> </h3>
                        <h4><b></b> </h4>
                    </div>
                    <div class="col1"></div>
                </div>
                <div style={{ border: "1px solid black" }} class="row row-cols-1 row-cols-md-2 g-2 mb-2 mt-4 p-1" >
                    <GetBCard index={0} />
                    <GetBCard index={1} />
                    <GetBCard index={2} />
                    <GetBCard index={3} />
                </div>

                <div class="row " >
                    <div class="col-5"></div>
                    <div class="col-2">{/*pageNum*/}</div>
                    <div class="col-5"></div>
                </div>
            </div>
            <div class="col-2"></div>
        </div>)
    };


    function GetBCard(props) {
        var x = props.index;

        var cardFooter = (
            <div class="card-footer text-muted" style={{ fontSize: "70%" }}>
                {`NWRFDBCard #B${cardGenSettings.batchNum}C${cardIds[x] + 1}`}
            </div>)


        if (cardGenSettings.cardsPerPage == 1) {




            return (

                <div class="col" >
                    <div class="card" style={{ border: '1px solid black' }}>
                        {/* <img src="..." class="card-img-top" alt="..." /> */}
                        <div class="card-body">
                            <GetCard index={cardIds[0]} />
                        </div>
                        {cardFooter}

                    </div>
                </div>);
        }
        return (<> {cardIds.length >= (x + 1) ?
            <div class="col">
                <div class="card" style={{ border: '1px solid black' }}>
                    {/* <img src="..." class="card-img-top" alt="..." /> */}
                    <div class="card-body">
                        <GetCard index={cardIds[x]} />
                    </div>
                    {cardFooter}

                </div>
            </div>
            :
            <div class="col" style={{ visibility: "hidden", border: '1px solid black' }}>
                <div class="card">
                    {/* <img src="..." class="card-img-top" alt="..." /> */}
                    <div class="card-body">
                        <GetCard index={cardIds[0]} />
                    </div>
                    {cardFooter}

                </div>
            </div>
        }  </>);

    }

    useEffect(() => {

        if (showSavePDFBtn) {
            document.getElementById("savePDFBtn").style.visibility = "visible";
        } else {
            document.getElementById("savePDFBtn").style.visibility = "hidden";

        }

    }, []);


    if (!cardGenSettings.onePageCardGenMethod) {

        var cardsPerPage = cardGenSettings.cardsPerPage;
        var x = Math.floor(bingoCardData.length / cardsPerPage)// + ();
        var y = bingoCardData.length % cardsPerPage;

        for (let pageNum = 1; pageNum <= x; pageNum++) {
            var tempCardIdarray = [];
            // console.log("pageNum: ", pageNum);
            for (let c = (pageNum - 1) * cardsPerPage; c < (pageNum) * cardsPerPage; c++) {
                tempCardIdarray.push(c)
            }
            pageArray.push(tempCardIdarray)
            //setarrayOfCardID(tempCardIdarray, timer);

            console.log(pageNum, "val: ", tempCardIdarray);
        }

        console.log("Page Array1: ", pageArray);


        var tempCardIdarray = [];
        // console.log("pageNum: ", pageNum);
        if (y > 0) {


            for (let c = bingoCardData.length - y; c < bingoCardData.length; c++) {
                tempCardIdarray.push(c)
            }

            pageArray.push(tempCardIdarray)
            console.log("Page Array2: ", pageArray);

        }
        //setarrayOfCardID(tempCardIdarray, timer);

        console.log(pageNum, "val: ", tempCardIdarray);


        return (<>
            <div class="container" style={{ border: "1px solid blue" }}>
                <div class="row">
                    <div class="col-4">                    </div>
                    <div class="col-4"><button id="savePDFBtn" type="button" class="btn btn-primary" onClick={() => printPDF()}>Save PDF</button></div>
                </div>

                {pageArray.map((element, index) => (

                    <GetCardPage key={index} index={element} />


                ))}



            </div>


        </>);

    };



    return (<>
        {/* <div class="container-fluid vh-100 d-flex justify-content-center align-content-center flex-wrap " style={{ border: "1px solid blue" }}> */}
        <div class="container" style={{ border: "1px solid blue" }}>

            {/* <div class="row d-flex  justify-content-center" style={{ width: cardW, border: "1px solid red" }}>
                <div class="col-4"></div>
                <div class="col-4"></div>
            </div> */}

            <div class="row">
                <div class="col-4">

                </div>
                <div class="col-4"><button id="savePDFBtn" type="button" class="btn btn-primary" onClick={() => printPDF()}>Save PDF</button></div>
            </div>

           

            <getCardPage />



        </div>
    </>)

}

function GetCard(props) {
    var cardId = props.index

    //console.log("her", bingoCardData)
    return (

        <table class="table table-bordered border-dark" style={{ marginBottom: "0" }}>
            <thead>
                <tr>
                    <th scope="col">{cardGenSettings.letters[0]}</th>
                    <th scope="col">{cardGenSettings.letters[1]}</th>
                    <th scope="col">{cardGenSettings.letters[2]}</th>
                    <th scope="col">{cardGenSettings.letters[3]}</th>
                    <th scope="col">{cardGenSettings.letters[4]}</th>
                </tr>
            </thead>
            <tbody>


                {
                    Object.keys(bingoCardData[cardId]).map((letter, letterIndex) => (
                        <tr >
                            <td>{bingoCardData[cardId]["B"][letterIndex]}</td>
                            <td>{bingoCardData[cardId]["I"][letterIndex]}</td>

                            {bingoCardData[cardId]["N"][letterIndex] == cardGenSettings.centerVal ?
                                <td style={{ fontSize: "60%", justifyContent: "center" }}>{bingoCardData[cardId]["N"][letterIndex]}</td>
                                :
                                <td>{bingoCardData[cardId]["N"][letterIndex]}</td>


                            }



                            <td>{bingoCardData[cardId]["G"][letterIndex]}</td>
                            <td>{bingoCardData[cardId]["O"][letterIndex]}</td>

                        </tr>

                    ))}
            </tbody>
        </table>
    )

}






export default BingoCards;