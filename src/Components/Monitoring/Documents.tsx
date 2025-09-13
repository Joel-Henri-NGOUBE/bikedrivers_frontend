import type { IDocumentProp } from "../../Interfaces/Document";
import { getLastSplittedElement } from "../../Utils/functions";
// import FileImage from "file.png"

export default function Documents({documents}: IDocumentProp){
    return <div className="documents">
        {documents.map((d) => <a href={[`${import.meta.env.VITE_APP_BACKEND_API_URL}`, d.path].join("")} target="_blank"><div className="document">
            <img src="/file.png" alt={getLastSplittedElement(d.path)} width="35px"/>
            <span className="path">{getLastSplittedElement(d.path)}</span>
        </div></a>)  }
    </div>
}