import axios from 'axios';

function Buy({id}) {
  const token = localStorage.getItem('token');
  const handleBuy = async () => {
    try {
      const response = await axios.post(
        `http://localhost:7000/api/buy/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Request sent to owner");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleBuy}
      className="h-fit w-[60px] p-2 border-2 bg-amber-400 rounded-2xl hover:bg-amber-700 text-2xl cursor-pointer "
    >
      Buy
    </button>
  );
}

export default Buy;
