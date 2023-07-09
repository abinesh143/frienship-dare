import sticker from "../sticker.json";

const WhatsSticker = () => {
  const stickerData = sticker;
  return (
    <div>
      <div className="px-3">
        <h2 className="fs-2 fw-semibold text-uppercase text-center my-3">
          Animated Stickers
        </h2>
        {stickerData.map((s, index) => {
          return (
            <div key={index} className="shadow p-3 mb-5 bg-body-tertiary rounded d-flex flex-column justify-content-center">
              <img src={s.url} className="img-fluid"></img>
              <a type="button" href={s.link} className="btn btn-success  mt-3">
                Add to Whatsapp
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhatsSticker;
