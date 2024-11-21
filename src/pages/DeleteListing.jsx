import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function DeleteListing() {
    const navigate = useNavigate();
    const { listingId } = useParams();

    useEffect(() => {
        const deleteListing = async () => {
            try {
                const docRef = doc(db, "listings", listingId);
                await deleteDoc(docRef);
                toast.success("Listing deleted successfully");
                navigate('/admin/dashboard'); // Go back to the previous page
            } catch (error) {
                toast.error("Failed to delete listing");
            }
        };

        deleteListing();
    }, [listingId]);

    return <div>Deleting...</div>; // Optionally provide some feedback while deleting
}

export default DeleteListing;
