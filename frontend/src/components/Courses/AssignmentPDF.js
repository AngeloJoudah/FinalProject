import React, {useState, useEffect} from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
export const AssignmentPDF = ({ArrayBuffer}) => {

    const [numPages,setNumPages] = useState(null)
    const [page,setPage] = useState(1)
    const [pdfWidth,setPdfWidth] = useState(0)
    const onDocumentLoadSuccess = ({numPages}) =>{
        setNumPages(numPages)
    }
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    useEffect(() => {
        // Dynamically calculate and set the width of the PDF pages
        const containerWidth = document.getElementsByClassName('pdf-container').clientWidth
        setPdfWidth(containerWidth / numPages);
      }, [numPages]);
  return (
    <div style={{justifyContent:"center"}} className='container pdf-container'>
        <hr></hr>
        <div className='offset-3 col-6 offset-3' style={{border:".5px solid black",position:"relative", overflow:"scroll", height:"600px",justifyContent:"center"}}>
            <Document file={{data:ArrayBuffer}} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
            <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={pdfWidth}
                style={{section:{margin:10,padding:10,flexGrow:1}}}
            />
            ))}
            </Document>
        </div>
        <p style={{textAlign:"center"}}>
        </p>
    </div>
  )
}
