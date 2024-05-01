import NavBar from "../components/NavBar/Navbar";
import GalleryComponent from "../components/Gallery/galleryComponent";
import Footer from "../components/Footer/footer";

const Gallery = () => {
  return (
    <div className="mt-20">
      <NavBar />
      <div className="w-full px-36 py-10">
        <GalleryComponent />
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
