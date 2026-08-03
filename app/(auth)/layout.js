const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex justify-center pt-40">
        {children}
      </div>

      
    </div>
  );
};

export default AuthLayout;