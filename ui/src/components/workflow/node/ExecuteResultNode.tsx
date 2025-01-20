import { memo } from "react";
import { useTranslation } from "react-i18next";
import {
  CheckCircleOutlined as CheckCircleOutlinedIcon,
  CloseCircleOutlined as CloseCircleOutlinedIcon,
  MoreOutlined as MoreOutlinedIcon,
} from "@ant-design/icons";
import { Button, Card, Popover, theme } from "antd";

import { WorkflowNodeType } from "@/domain/workflow";
import AddNode from "./AddNode";
import SharedNode, { type SharedNodeProps } from "./_SharedNode";

export type ConditionNodeProps = SharedNodeProps & {
  branchId: string;
  branchIndex: number;
};

const ExecuteResultNode = ({ node, disabled, branchId, branchIndex }: ConditionNodeProps) => {
  const { t } = useTranslation();

  const { token: themeToken } = theme.useToken();

  return (
    <>
      <Popover
        classNames={{ root: "shadow-md" }}
        styles={{ body: { padding: 0 } }}
        arrow={false}
        content={
          <SharedNode.Menu
            node={node}
            branchId={branchId}
            branchIndex={branchIndex}
            disabled={disabled}
            trigger={<Button color="primary" icon={<MoreOutlinedIcon />} variant="text" />}
          />
        }
        placement="rightTop"
      >
        <Card className="relative z-[1] mt-10 w-[256px] shadow-md" styles={{ body: { padding: 0 } }} hoverable>
          <div className="flex h-[48px] flex-col items-center justify-center truncate px-4 py-2">
            <div className="flex items-center space-x-2">
              {node.type === WorkflowNodeType.ExecuteSuccess ? (
                <>
                  <CheckCircleOutlinedIcon style={{ color: themeToken.colorSuccess }} />
                  <div>{t("workflow_node.execute_success.label")}</div>
                </>
              ) : (
                <>
                  <CloseCircleOutlinedIcon style={{ color: themeToken.colorError }} />
                  <div>{t("workflow_node.execute_failure.label")}</div>
                </>
              )}
            </div>
          </div>
        </Card>
      </Popover>

      <AddNode node={node} disabled={disabled} />
    </>
  );
};

export default memo(ExecuteResultNode);
