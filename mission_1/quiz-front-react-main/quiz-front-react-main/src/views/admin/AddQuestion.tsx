import QuestionForm from "../../components/QuestionForm";

function AddQuestion () {
    return (
        <div>
            <h1>Page ajout de question</h1>
            <QuestionForm questionId={null} />
        </div>
    )
}

export default AddQuestion;