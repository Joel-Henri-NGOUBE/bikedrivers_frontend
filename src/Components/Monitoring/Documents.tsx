import type { IDocumentProp } from "../../Interfaces/Document";
import { getLastSplittedElement, sliceFileName } from "../../Utils/functions";
// import FileImage from "file.png"

export default function Documents({documents}: IDocumentProp){
    return <div className="documents">
        <h2>Documents</h2>
        <div className="documents-wrapper">
        {documents.map((d) => <a href={[`${import.meta.env.VITE_APP_BACKEND_API_URL}`, d.path].join("")} target="_blank"><div className="document">
            <img src="/file.png" alt={getLastSplittedElement(d.path)} width="35px"/>
            <span className="path">{sliceFileName(getLastSplittedElement(d.path), 30)}</span>
        </div></a>)  }
        </div>
    </div>
}