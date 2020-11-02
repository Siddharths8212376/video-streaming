import React from 'react'
 
import PDFViewer from 'pdf-viewer-reactjs'



 
const Present = () => {
    return (
        <PDFViewer
            document={{
                url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf',
            }}
            page = {2}
            onNextBtnClick={(pgno)=>{
                console.log(pgno)
            }}
        />
    )
}

const studentPresent = () => {
    return (
        <PDFViewer
            document={{
                url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf',
            }}
            page = {2}
            onNextBtnClick={(pgno)=>{
                console.log(pgno)
            }}
        />
    )
}
 
export default Present