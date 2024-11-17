// import React from 'react'
import { useParams } from "react-router-dom";
import InPageNavigation from "../components/inpage-navigation.component";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component";
import AnimationWrapper from "../common/page-animation";
import BlogPostCard from "../components/blog-post.component";
import NoDataMessage from "../components/nodata.component";
import LoadMoreDataBtn from "../components/load-more.component";
import axios from "axios";
import { filterPaginationData } from "../common/filter-pagination-data";
import UserCard from "../components/usercard.component";


const SearchPage = () => {
  
    let { query } = useParams()
    let [ blogs, setBlog ] = useState(null);
    let [ users, setUsers ] = useState(null);

    const searchBlogs = ({ page = 1, create_new_arr = false }) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { query, page })
        .then(async ({ data }) => {
            let formatedData = await filterPaginationData({
              state: blogs,
              data: data.blogs,
              page,
              countRoute: "/search-blogs-count",
              data_to_send: {query},
              create_new_arr
            });
            setBlog(formatedData);
          })
          .catch((err) => {
            console.log(err);
          });
    }

    const fetchUsers = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { query })
        .then(({ data : { users } } ) => {
            setUsers(users);
        })
    }
    useEffect(() => {
        resetState(); 
        // screen was going blank after using this, so maybe you have to use this after
        // integrating with backend 
        searchBlogs({page: 1, create_new_arr: true });
        fetchUsers();
    },[query])

    const resetState = () => {
        setBlog(null);
        setUsers(null);
    }
    const UserCardWrapper = () => {
        return (
            <>
                {
                    users == null ? <Loader /> :
                        users.length ? 
                            users.map((user, i) => {
                                return <AnimationWrapper key={i} transition={{ duration: 1, delay: i*0.08 }}>
                                    <UserCard user= { user } />
                                </AnimationWrapper>
                            })
                        : <NoDataMessage message="No user found" />
                }
            </>
        )
    }

    return (
        <section className="h-cover flex justify-center gap-10">

        <div className="w-full">
            <InPageNavigation routes={[`Search Results from "${query}"`, "Accounts Matched"]} >
                <>
                {blogs == null ? (
                <Loader />
              ) : (
                blogs.results.length ? 
                  blogs.map((blog, i) => {
                    return (
                      <AnimationWrapper
                        transition={{ duration: 1, delay: i * 0.1 }}
                        key={i}
                      >
                        <BlogPostCard
                          content={blog}
                          author={blog.author.personal_info}
                        />{" "}
                      </AnimationWrapper>
                    );
                  })
                : <NoDataMessage message="No blogs here"/>
              )}
              <LoadMoreDataBtn state={blogs} fetchDataFun={(searchBlogs)}/>
                </>
                <UserCardWrapper/>
            </InPageNavigation>

        </div>

    </section>
  )
}

export default SearchPage
