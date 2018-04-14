import React from "react";
import { FormData } from "webiny-graphql-ui";
import Scopes from "./PermissionsForm/Scopes";

import { i18n, createComponent } from "webiny-app";
const t = i18n.namespace("Security.PermissionsForm");

class PermissionsForm extends React.Component {
    render() {
        const { AdminLayout, Form, Section, View, Grid, Input, Button } = this.props.modules;

        return (
            <AdminLayout>
                <FormData
                    entity="SecurityPermission"
                    withRouter
                    fields="id name slug description scope createdOn"
                    onSubmitSuccess="Permissions.List"
                    onCancel="Permissions.List"
                    defaultModel={{ scope: {} }}
                    onSuccessMessage={({ model }) => {
                        return (
                            <span>
                                {t`Permission {permission} was saved successfully!`({
                                    permission: <strong>{model.name}</strong>
                                })}
                            </span>
                        );
                    }}
                >
                    {({ model, onSubmit, invalidFields }) => (
                        <Form model={model} onSubmit={onSubmit} invalidFields={invalidFields}>
                            {({ model, form, Bind }) => {
                                return (
                                    <View.Form>
                                        <View.Header
                                            title={
                                                model.id
                                                    ? t`Security - Edit permission`
                                                    : t`Security - Create permission`
                                            }
                                        />
                                        <View.Body>
                                            <Section title={t`General`} />
                                            <Grid.Row>
                                                <Grid.Col all={6}>
                                                    <Bind>
                                                        <Input
                                                            label={t`Name`}
                                                            name="name"
                                                            validate="required"
                                                        />
                                                    </Bind>
                                                </Grid.Col>
                                                <Grid.Col all={6}>
                                                    <Bind>
                                                        <Input label={t`Slug`} name="slug" />
                                                    </Bind>
                                                </Grid.Col>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Grid.Col all={12}>
                                                    <Bind>
                                                        <Input
                                                            label={t`Description`}
                                                            name="description"
                                                            validate="required"
                                                        />
                                                    </Bind>
                                                </Grid.Col>
                                            </Grid.Row>
                                            <br />
                                            <Grid.Row>
                                                <Grid.Col all={12}>
                                                    <Scopes model={model} form={form} />
                                                </Grid.Col>
                                            </Grid.Row>
                                        </View.Body>
                                        <View.Footer>
                                            <Button
                                                type="default"
                                                onClick={form.cancel}
                                                label={t`Go back`}
                                            />
                                            <Button
                                                type="primary"
                                                onClick={form.submit}
                                                label={t`Save permission`}
                                                align="right"
                                            />
                                        </View.Footer>
                                    </View.Form>
                                );
                            }}
                        </Form>
                    )}
                </FormData>
            </AdminLayout>
        );
    }
}

export default createComponent(PermissionsForm, {
    modules: [{ AdminLayout: "Admin.Layout" }, "Form", "Section", "View", "Grid", "Input", "Button"]
});