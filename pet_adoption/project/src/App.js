import "./App.css";
import {
  Header,
  CreateShelter,
  Signup,
  Login,
  PetProfile,
  HomePage,
  NotFound,
  StaffProfile,
  CreatePetProfile,
  Application,
  Pets,
  Shelters,
  ShelterProfile,
  Admin,
} from "./components/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie] = useCookies(["user"]);
  function handleLogin(user) {
    setCookie("user", user, { path: "/" });
  }

  return (
    <>
      {/* Document not done */}
      <BrowserRouter>
        <Routes>
        <Route path="/admin" element={<Admin user={cookies.user}/>} />{" "}
          <Route path="/shelterprofile" element={<><Header user={cookies.user}/><ShelterProfile /></>} />{" "}
          {/* no back end*/}
          <Route
            path="/profile"
            element={<><Header user={cookies.user}/><StaffProfile user={cookies.user} /></>}
          />{" "}
          {/* done */}
          <Route path="/createpetprofile" element={<><Header user={cookies.user}/><CreatePetProfile user={cookies.user}/></>} />{" "}
          {/* no back end*/}
          <Route
            path="/shelters"
            element={<><Header user={cookies.user}/><Shelters user={cookies.user} /></>}
          />{" "}
          {/* done ,,, need sort by*/}
          <Route path="/application" element={<><Header user={cookies.user}/><Application /></>} />{" "}
          {/* no back end */}
          <Route path="/pets" element={<><Header user={cookies.user}/><Pets  user={cookies.user}/></> } />{" "}
          {/* no back end ,, need search by khaled ,, sort by backend */}
          <Route
            path="/createshelter"
            element={<><Header user={cookies.user}/><CreateShelter user={cookies.user} /></>}
          />{" "}
          {/* Done */}
          <Route path="/homepage" element={<><Header user={cookies.user}/><HomePage /></>} />{" "}
          {/* done ,, need buttons */}
          <Route path="/" element={<Login onLogin={handleLogin} />} />{" "}
          {/* Done */}
          <Route path="/signup" element={<Signup />} />{" "}
          {/* done ,, how staff assign shelter ? */}
          <Route path="/petprofile" element={<><Header user={cookies.user}/><PetProfile /></>} />{" "}
          {/*  need backend */}
          <Route path="*" element={<NotFound />} /> {/* Done */}
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// <BrowserRouter>
//         <Routes>
//           <Route
//             path="/elearning"
//             element={
//               <>
//                 <Header />
//                 <HomePage />
//               </>
//             }
//           />
//           <Route path="/makecourse" element={<MakeCourse user={cookies.user} />} />
//           <Route path="/makelecture" element={<MakeLecture user={cookies.user} cid={courseId} />} />
//           <Route path="/makeannoun" element={<MakeAnnounm user={cookies.user}  cid={courseId}/>} />
//           <Route path="*" element={<NotFound user={cookies.user} />} />
//           <Route path="/admin" element={<><Admin user={cookies.user} /></>} />
//           <Route index  element={
//             <CookiesProvider>

//                 <div>
//                   {cookies.user || !cookies.user ? (
//                     <Login onLogin={handleLogin} />
//                   ) : (
//                     <></>
//                   )}
//                 </div>
//               </CookiesProvider>
//             }
//           />
//           <Route path="/signup" element={<Signup />} />
//           <Route
//             path="/updateprofile"
//             element={
//               <>
//                 <Header />
//                 <UpdateProfile user={cookies.user} />
//               </>
//             }
//           />
//         </Routes>
//       </BrowserRouter>
