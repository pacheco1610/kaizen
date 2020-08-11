<Layout style={{ height: "100vh" }}>
<Content
    style={{
        padding: "0 50px",
        marginTop: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
    }}
>
    <div
        style={{
            background: "#fff",
            padding: 24,
            height: 450,
            width: 400,
            textAlign: "center",
            flexDirection: "column",
            justifyContent: "center",
            display: "flex"
        }}
    >
        {!signup ? (
            <Form className="login-form" onSubmit={correoClave}>
                <Form.Item>
                    <h1>Ingreso</h1>
                </Form.Item>
                {error? <Form.Item><Errores mensaje={error}/></Form.Item>:null}
                <Form.Item>
                    <Input
                        prefix={
                            <Icon
                                type="user"
                                style={{
                                    color: "rgba(0,0,0,.25)"
                                }}
                            />
                        }
                        name="usuario"
                        placeholder="Usuario"
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        prefix={
                            <Icon
                                type="lock"
                                style={{
                                    color: "rgba(0,0,0,.25)"
                                }}
                            />
                        }
                        name="clave"
                        type="password"
                        placeholder="Clave"
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        style={{ marginRight: 10 }}
                    >
                        Ingresa
                    </Button>
                    O{" "}
                    <Button
                        onClick={() => setsignup(true)}
                        type="link"
                    >
                        Registrate Ahora!
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="danger"
                        htmlType="button"
                        className="login-form-button"
                        style={{ marginRight: 10 }}
                        onClick={() => socialLogin(googleAuthProvider)}
                    >
                        Google
                    </Button>
                    <Button
                        type="primary"
                        htmlType="button"
                        className="login-form-button"
                        style={{ marginRight: 10 }}
                        onClick={() => socialLogin(facebookAuthProvider)}
                    >
                        Facebook
                    </Button>
                    <Button
                        type="danger"
                        htmlType="button"
                        className="login-form-button"
                        style={{ marginRight: 10 }}
                        onClick={() => socialLogin(githubAuthProvider)}
                    >
                        GitHub
                    </Button>
                </Form.Item>
            </Form>
        ) : (
            <Signup setsignup={setsignup} />
        )}
    </div>
</Content>
<Footer style={{ textAlign: "center" }}>
    Creado por Nicolás Morales
</Footer>
</Layout>