/**
 * @file type definitions
 * @author meixuguang
 */

namespace jump.runtime {
    interface runtimeGulpPluginOptions {
        framework: any;
        target: string;
        dest: destObj;
    }
}

namespace jump.script {
    interface compileScriptResult {
        code: string;
        config: any;
        components: {
            [name: string]: string;
        };
        computedKeys: string[];
        moduleType: moduleType
    }

    enum moduleType {
        esm = 'esm',
        cmd = 'cmd'
    }
}
