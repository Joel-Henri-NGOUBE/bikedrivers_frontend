import type { IReaquiredDocumentProp } from "../../Interfaces/RequiredDocuments";
import InputLabel from "../InputLabel";

export default function RequiredDocument({name, informations, handleChange1, handleChange2}: IReaquiredDocumentProp){

    return <div className="requiredDocument">
        <InputLabel 
        label="Name"
        placeholder="The name of the document"
        type="text"
        inputValue={name}
        handleChange={(e) => handleChange1(e)}
        />

        <InputLabel 
        label="Informations"
        placeholder="Additional informations about the document"
        type="text"
        inputValue={informations || ""}
        handleChange={(e) => handleChange2(e)}
        />
    </div>
}