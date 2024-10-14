import Breadcrumbs from "@/components/Breadcrumbs";

const Members = () => {
  const linkList = [
    { to: "/", label: "Home" },
    { to: "/members", label: "Members" },
  ];

  return (
    <div>
      <Breadcrumbs linkList={linkList} />
      <h1>Members</h1>
    </div>
  );
};

export default Members;
