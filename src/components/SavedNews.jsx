import SavedNewsCardsList from './SavedNewsCardsList';
import SavedNewsHeader from './SavedNewsHeader';  // Added for search functionality

const SavedNews = ({
    isLoggedIn,
    currentUser,
    handleLogout,
    keyword,
}) => {
    return ( 
        <>
        <SavedNewsHeader 
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        handleLogout={handleLogout}
        />
        <SavedNewsCardsList 
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        keyword={keyword}  // Added for search functionality
        />
        </>
     );
}
 
export default SavedNews