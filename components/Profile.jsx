import SnippetCard from "./SnippetCard"


const Profile = ({name, desc, data, handleEdit, handleDelete}) => {
  return (
    <section className="w-full">
        <h1 className="text-left head_text">
            <span className="blue_gradient">{name} Profile</span>
        </h1>
        <p className="text-left desc">{desc}</p>
        <div className="mt-16 snippet_layout">
            {
                data.map((post) => (
                <SnippetCard key={post._id}
                            post = {post}
                            handleEdit = {() => {handleEdit && handleEdit(post)}}
                            handleDelete = {() => {handleDelete && handleDelete(post)}}/>
                ))
            }
        </div>
    </section>
  )
}

export default Profile