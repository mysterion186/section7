import QuestionForm from "../../components/QuestionForm";
import { useParams } from "react-router-dom";

function EditPage (){
    const {position} = useParams();
    return(
        <div>
           Page edit {position}
           <QuestionForm questionId={parseInt(position as string)}/>
        </div>
    )
}

export default EditPage;