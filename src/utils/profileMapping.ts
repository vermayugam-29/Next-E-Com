import AddItems from "@/components/profile/profileComponents/AddItems";
import Chats from "@/components/profile/profileComponents/Chats";
import Logout from "@/components/profile/profileComponents/Logout";
import Orders from "@/components/profile/profileComponents/Orders";
import Profile from "@/components/profile/profileComponents/Profile";
import Settings from "@/components/profile/profileComponents/Settings";
import ViewDashboard from "@/components/profile/profileComponents/ViewDashboard";

export const Mapping : { [key: string]: React.ComponentType } = {
    'Profile' : Profile,
    'Settings' : Settings,
    'Items' : AddItems,
    'Logout' : Logout,
    'Orders' : Orders,
    'Chats' : Chats,
    'Dashboard' : ViewDashboard
}