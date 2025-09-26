import type { IRequiredDocumentsProp } from "../../Interfaces/RequiredDocuments";
import RequiredDocument from "./RequiredDocument";

export default function RequiredDocuments({setRequiredDocumentsCount, requiredDocuments, setRequiredDocuments}: IRequiredDocumentsProp){
    function handleClick(){
        setRequiredDocumentsCount((rd) => rd + 1)
        setRequiredDocuments((rd) => [...rd, {
            id: rd.reverse()[0].id + 1,
            name: "",
            informations: ""
        }])
    }
    return <div className="requiredDocuments">
        {requiredDocuments.map((rd) => 
            <RequiredDocument
            key={rd.id}
            name={rd.name}
            handleChange1={(e) => setRequiredDocuments(rds => rds.map((reqDoc) => 
                rd.id === reqDoc.id ? {...reqDoc, name: e.target.value} : reqDoc
            ))}
            informations={rd.informations}
            handleChange2={(e) => setRequiredDocuments(rds => rds.map((reqDoc) => 
                rd.id === reqDoc.id ? {...reqDoc, informations: e.target.value} : reqDoc
            ))}
            />)
            }
        <button onClick={() => handleClick()}>Add required document</button>
    </div>
}