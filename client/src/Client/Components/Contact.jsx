import { useParams } from "react-router-dom";
import Chat from "../../Auth/Chat";


const Contact = () => {
  const { id } = useParams();

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md h-[500px] flex flex-col">
      <Chat ownerId={id} />
    </div>
  );
};

export default Contact;
