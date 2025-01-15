import React from 'react'
import Post from './Post'
const Posts = ({ PostData }) => {

console.log(PostData)
    return (
        <>
            <div className='bg-gray-900 flex justify-between pb-8  md:px-6 px-3 w-full'>
                <div className='grid md:grid-cols-3 grid-cols-1 md:px-3 px-0 justify-center md:gap-9 gap-7 w-full items-center pb-20'>

                    {

                        PostData.map((e) => (
                            <Post key={e.title} image={e.photo.imageUrl} title={e.title} Desc={e.summary}
                                createdAt={e.createdAt} category={e.categories} user={e.username} postId={e._id} />
                        )



                        )}

                </div>
            </div>
        </>
    )
}

export default Posts