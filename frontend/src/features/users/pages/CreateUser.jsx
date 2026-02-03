import { Link } from "react-router-dom";
import UserForm from "../components/UserForm";

const CreateUser = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Breadcrumb / Navigation */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/users" className="hover:text-slate-900 transition-colors">Users</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Create New</span>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">Create New User</h1>
        <p className="text-slate-500">Fill in the details below to provision a new account.</p>
      </div>

      <UserForm />
    </div>
  );
};

export default CreateUser;