import NavBar from "../components/NavBar/Navbar";
import GalleryComponent from "../components/GalleryComponent/GalleryComponent";
import Footer from "../components/Footer/footer";

const Gallery = () => {
  return (
    <div className="">
      <NavBar />
      <div className="w-full flex flex-col items-center justify-center gap-4 px-36 py-10">
        <h1 className="text-center text-4xl">Gallery</h1>
        <div className="">
          <GalleryComponent />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
