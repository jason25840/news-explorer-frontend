import SavedNewsCardsList from './SavedNewsCardsList';
import SavedNewsHeader from './SavedNewsHeader';  

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
        keyword={keyword} 
        />
        </>
     );
}
 
export default SavedNews