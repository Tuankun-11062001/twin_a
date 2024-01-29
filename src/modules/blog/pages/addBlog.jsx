import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../../../common/api/blogAPI";
import {
  BoxAddBlog,
  BoxViewBlog,
  BoxViewBlogBody,
} from "../../../common/components/box";
import Breadcrumb from "../../../common/components/breadcrumb";
import Notification from "../../../common/components/notification";
import Tiptap from "../../../common/components/tiptap";
import { enumPublish } from "../../../common/enum/publish";
import MainLayout from "../../../common/layout/mainLayout";
import { actions, useProviderNotification } from "../../../common/providers";

const AddBlog = () => {
  const navigate = useNavigate();
  const [showBodyBlog, setShowBodyBlog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [stateNotification, dispatchNotification] = useProviderNotification();

  const addBlogBreadcrumb = {
    buttonBack: {
      onListen: () => navigate(-1),
    },
    title: "Create product",
  };

  const [dataBlog, setDatablog] = useState({
    publish: true,
    title: "",
    thumbnail: "",
    description: "",
    body: "<pp>hello</pp>",
  });

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
    const blog = await createBlog(dataBlog);
    if (blog) {
      dispatchNotification(actions.setNotificationAdd(true));
    }
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

  return (
    <MainLayout>
      <Breadcrumb data={addBlogBreadcrumb} />
      {showBodyBlog ? (
        <BoxViewBlogBody data={dataBlog.body} close={handleShowBodyBlog} />
      ) : (
        <>
          {errorMessage && <p>{errorMessage}</p>}
          <div className="blog blog_add">
            <BoxAddBlog data={data} />
            <div>
              <BoxViewBlog data={dataBlog} viewBody={handleShowBodyBlog} />
            </div>
          </div>
          {stateNotification.notification.add && (
            <Notification
              type="add"
              data={{ title: "Notificaiotn", body: "Create Success!" }}
            />
          )}
        </>
      )}
    </MainLayout>
  );
};

export default AddBlog;
