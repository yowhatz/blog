import { FC } from "react";

import cls from "./ArcticleCard.module.scss";
import { Link } from "react-router-dom";
import { Card, Text } from "src/components";
import { sliceText } from "src/utils/sliceText";

interface ArticleCardProps {
  title: string;
  createdAt: Date;
  description: string;
  id: string;
  scrollTop?: boolean;
}

const ArticleCard: FC<ArticleCardProps> = ({
  title,
  description,
  createdAt,
  id,
  scrollTop,
}) => {
  const onScrollTop = () => {
    if (scrollTop) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <Card padding={15} className={cls.card}>
      <Link
        to={`/article/${id}`}
        className={cls.card_content}
        onClick={onScrollTop}
      >
        <Text as={"h2"} fs={24} color={"red"}>
          {sliceText(35, title)}
        </Text>

        <Text as={"span"} fs={12} color={"gray"}>
          {createdAt.toString()}
        </Text>

        <Text as={"p"} fs={16} color={"black"}>
          {sliceText(160, description)}
        </Text>
      </Link>
    </Card>
  );
};

export default ArticleCard;
