import React, { ChangeEvent, FormEvent, useState } from "react";

import cls from "./AddArticlePage.module.scss";

import { Button, Card, Form, Input, Text } from "src/components";
import { useAppDispatch } from "src/redux/store";
import { createArticle } from "src/redux/actions/articleAction";
import { useSelector } from "react-redux";
import { getArticleMessage } from "src/redux/selectors/article/getArticleMessage";

const AddArticlePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState({
    title: "",
    category: "",
    description: "",
  });

  const dispatch = useAppDispatch();
  const succesMessage = useSelector(getArticleMessage);

  const handleChangeFile = (e: ChangeEvent) => {
    const target: any = e.target as HTMLInputElement;

    const file: File = target.files[0];

    if (file) setFile(file);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(createArticle(data, file));

    setData({
      title: "",
      category: "",
      description: "",
    });
    setFile(null);
  };

  return (
    <Card padding={20} className={cls.article_add__page}>
      <Text as={"h1"} fs={24}>
        Добавить пост
      </Text>

      {succesMessage && (
        <Text as={"p"} fs={12} fw={400} color={"red"}>
          {succesMessage}
        </Text>
      )}

      <Form className={cls.form} onSubmit={onSubmit}>
        <label htmlFor={"file"} className={cls.file_label}>
          <input type={"file"} id={"file"} onChange={handleChangeFile} />
          <span className={cls.file_text}>Выберете файлы</span>
        </label>

        {file && (
          <img
            src={URL.createObjectURL(file)}
            className={cls.label_img}
            alt="img"
          />
        )}

        <Input
          placeholder={"Введите название поста"}
          name={"title"}
          onChange={handleChange}
          value={data.title}
        />

        <select
          name={"category"}
          className={cls.select}
          onChange={handleChange}
          value={data.category}
        >
          <option value={""}>Выберете категорию</option>
          <option value={"React"}>React</option>
          <option value={"Node"}>Node</option>
          <option value={"Angular"}>Angular</option>
          <option value={"Redux"}>Redux</option>
        </select>

        <Input
          placeholder={"Введите описание поста"}
          name={"description"}
          onChange={handleChange}
          value={data.description}
          textarea
        />

        <Button max>Добавить</Button>
      </Form>
    </Card>
  );
};

export default AddArticlePage;
