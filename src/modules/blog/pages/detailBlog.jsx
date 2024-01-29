import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteBlog, getBlog } from "../../../common/api/blogAPI";
import {
  BoxAddBlog,
  BoxViewBlog,
  BoxViewBlogBody,
} from "../../../common/components/box";
import Breadcrumb from "../../../common/components/breadcrumb";
import Notification from "../../../common/components/notification";
import { enumPublish } from "../../../common/enum/publish";
import MainLayout from "../../../common/layout/mainLayout";
import { actions, useProviderNotification } from "../../../common/providers";

const DetailBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showBodyBlog, setShowBodyBlog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [stateNotification, dispatchNotification] = useProviderNotification();
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
        const blog = await getBlog(location.state);
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

  const onListenEdit = async () => {
    if (
      dataBlog.title === "" ||
      dataBlog.thumbnail === "" ||
      dataBlog.description === "" ||
      dataBlog.body === ""
    ) {
      setErrorMessage("Missing filed");
    }
    const blog = await createBlog(dataBlog);
    if (blog) {
      dispatchNotification(actions.setNotificationAdd(true));
    }
  };

  const handleDelete = () => {
    dispatchNotification(actions.setNotificationDelete(true));
  };

  const handleYesDelete = async () => {
    const blogDel = await deleteBlog(dataBlog._id);
    if (blogDel) {
      navigate(-1);
      dispatchNotification(actions.setNotificationDelete(false));
    }
  };

  const dataNotificationDel = {
    title: "Delete Blog",
    code: dataBlog.title,
    body: "Are you sure you want to delete this blog?",
    handleYesDelete,
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
    onListenEdit,
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
            <p>Loading...</p>
          )}
          {stateNotification.notification.add && (
            <Notification
              type="add"
              data={{ title: "Notificaiotn", body: "Edit Success!" }}
            />
          )}
          {stateNotification.notification.delete && (
            <Notification type="delete" data={dataNotificationDel} />
          )}
        </>
      )}
    </MainLayout>
  );
};

export default DetailBlog;
