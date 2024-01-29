import React from "react";
import Breadcrumb from "../../../common/components/breadcrumb";
import MainLayout from "../../../common/layout/mainLayout";
import { BoxList, BoxView, BoxViewList } from "../../../common/components/box";
import { enumMoney } from "../../../common/enum/money";
import { enumBlog } from "../../../common/enum/blog";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { actions, useProviderBlog } from "../../../common/providers";
import { getAllBlog } from "../../../common/api/blogAPI";
const HomeBlog = () => {
  const navigate = useNavigate();
  const [stateBlog, dispatchBlog] = useProviderBlog();
  useEffect(() => {
    (async () => {
      if (stateBlog.blogs.length < 1) {
        const blogs = await getAllBlog();
        dispatchBlog(actions.getBlogs(blogs));
      }
    })();
  }, []);

  const dataTotalViewBlog = {
    title: "View Blog",
    svg: "blog",
    total: stateBlog.blogs?.length,
  };

  const dataViewMoneyBlog = {
    svg: enumMoney.blog.svg,
    title: enumMoney.blog.title,
    money: 200,
  };

  const dataViewListBlog = {
    title: enumBlog.viewList.title,
    view: enumBlog.viewList.view,
    svg: enumBlog.viewList.svg,
    selects: enumBlog.viewList.selects,
    dataTable: {
      type: enumBlog.viewList.table.type,
      dataTableTitle: enumBlog.viewList.table.titles,
      dataList: stateBlog.blogs || [],
    },
  };

  const navigateDetail = (item) => {
    navigate(`/blog/${item.title}`, { state: item._id });
  };

  const dataListBlog = {
    svg: enumBlog.full.svg,
    title: enumBlog.full.title,
    total: stateBlog.blogs.length,
    selects: enumBlog.full.selects,
    type: enumBlog.full.type,
    dataTable: {
      type: enumBlog.full.table.type,
      titles: enumBlog.full.table.titles,
      dataView: stateBlog.blogs || [],
      navigateDetail,
    },
  };

  const dataBreadcrumb = {
    title: "Blog",
    buttons: [
      {
        title: "Create One",
        classname: "button button_category",
        onListen: () => navigate("/blog/add"),
      },
    ],
  };

  return (
    <MainLayout>
      <Breadcrumb data={dataBreadcrumb} />
      <div className="blog blog_head">
        <BoxView data={dataTotalViewBlog} classname="box box_view_small" />
        <BoxView data={dataViewMoneyBlog} classname="box box_view" />
        <BoxViewList data={dataViewListBlog} />
      </div>
      <BoxList data={dataListBlog} />
    </MainLayout>
  );
};

export default HomeBlog;
