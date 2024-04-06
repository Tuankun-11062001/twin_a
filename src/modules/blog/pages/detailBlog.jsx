import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteBlogAPI, getBlogAPI } from "../../../common/api/blogAPI";
import {
  BoxAddBlog,
  BoxViewBlog,
  BoxViewBlogBody,
} from "../../../common/components/box";
import Breadcrumb from "../../../common/components/breadcrumb";
import Notification, {
  NotificationAsk,
} from "../../../common/components/notification";
import { enumPublish } from "../../../common/enum/publish";
import MainLayout from "../../../common/layout/mainLayout";
import Loading from "../../../common/pages/loading";
import { useDispatch, useSelector } from "react-redux";
import {
  askDelBlog,
  closeMessage,
  deleteBlogThunk,
  editBlogThunk,
} from "../../../common/providers/slices/blogSlice";
import NotificationInfo from "../../../common/components/notification";

const DetailBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { notification, message, notificationEdit } = useSelector(
    (state) => state.blog
  );
  const [showBodyBlog, setShowBodyBlog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  const [dataBlog, setDatablog] = useState({
    publish: true,
    title: "",
    thumbnail: "",
    description: "",
    body: "",
  });

  useEffect(() => {
    (async () => {
      if (location.state) {
        const blog = await getBlogAPI(location.state);
        setDatablog(blog);
        setTimeout(() => setShowEdit(true), 1000);
      }
    })();
  }, []);

  const formListen = (e) => {
    const { name, value } = e.target;
    setDatablog((prev) => ({ ...prev, [name]: value }));
  };

  const handleShowBodyBlog = () => {
    setShowBodyBlog(!showBodyBlog);
  };

  // const listenBody =

  const onListenCreate = async () => {
    if (
      dataBlog.title === "" ||
      dataBlog.thumbnail === "" ||
      dataBlog.description === "" ||
      dataBlog.body === ""
    ) {
      setErrorMessage("Missing filed");
    }
    dispatch(editBlogThunk(dataBlog));
  };

  const handleDelete = () => {
    dispatch(askDelBlog(location.state));
  };

  const handleAcceptDelete = async () => {
    dispatch(deleteBlogThunk(location.state));
    // navigate(-1);
  };

  const data = {
    //  =================================================================
    //                          publish select
    //  =================================================================

    selectPublished: {
      name: "publish",
      onListen: formListen,
      value: dataBlog.publish,
      classname: "select select_publish",
      data: enumPublish.selects,
    },

    //  =================================================================
    //                          form group title
    //  =================================================================

    formGroupTitle: {
      type: "normal",
      classnameFormGroup: "form_group",
      lable: "Title",
      inputClassname: "input input_form_group",
      inputListen: formListen,
      inputName: "title",
      inputValue: dataBlog.title,
    },

    //  =================================================================
    //                          form group thumbnail
    //  =================================================================

    formGroupThumbnail: {
      type: "normal",
      classnameFormGroup: "form_group",
      lable: "thumbnail",
      inputClassname: "input input_form_group",
      inputListen: formListen,
      inputName: "thumbnail",
      inputValue: dataBlog.thumbnail,
    },

    //  =================================================================
    //                          form group description
    //  =================================================================

    formGroupDescription: {
      type: "area",
      classnameFormGroup: "form_group",
      lable: "Description",
      inputClassname: "input input_form_group",
      inputListen: formListen,
      inputName: "description",
      inputValue: dataBlog.description,
      classnameArea: "area",
    },
    //  =================================================================
    //                          form group body
    //  =================================================================

    formGroupBody: {
      inputName: "body",
      inputValue: dataBlog.body,
      inputListen: setDatablog,
    },
    onListenCreate,
  };

  const detailBlogBreadcrumb = {
    buttonBack: {
      onListen: () => navigate(-1),
    },
    title: "Detail Blog",
    // param: dataProduct.code,
    buttons: [
      {
        title: "Delete",
        svg: "trash",
        classname: "button button_product_delete",
        onListen: handleDelete,
      },
    ],
  };
  return (
    <MainLayout>
      <Breadcrumb data={detailBlogBreadcrumb} />
      {showBodyBlog ? (
        <BoxViewBlogBody data={dataBlog.body} close={handleShowBodyBlog} />
      ) : (
        <>
          {errorMessage && <p>{errorMessage}</p>}
          {showEdit ? (
            <div className="blog blog_add">
              <BoxAddBlog data={data} />
              <div>
                <BoxViewBlog data={dataBlog} viewBody={handleShowBodyBlog} />
              </div>
            </div>
          ) : (
            <Loading />
          )}
          {notification && (
            <NotificationAsk
              info={message}
              handleClose={() => dispatch(closeMessage())}
              handleAccept={handleAcceptDelete}
            />
          )}
          {notificationEdit && (
            <NotificationInfo
              info={message}
              handleClose={() => dispatch(closeMessage())}
            />
          )}
        </>
      )}
    </MainLayout>
  );
};

export default DetailBlog;
