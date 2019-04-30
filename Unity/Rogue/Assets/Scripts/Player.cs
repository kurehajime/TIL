using UnityEngine;
using System.Collections;
using UnityEngine.SceneManagement;      //Allows us to use SceneManager

//Player inherits from MovingObject, our base class for objects that can move, Enemy also inherits from this.
public class Player : MovingObject
{
    public float restartLevelDelay = 1f;        //次の階に映るまでの秒数
    public int pointsPerFood = 10;  
    public int pointsPerSoda = 20; 
    public int wallDamage = 1; 

    private Animator animator; 
    private int food;

    protected override void Start()
    {
        animator = GetComponent<Animator>();

        food = GameManager.instance.playerFoodPoints;

        base.Start();
    }


    private void OnDisable()
    {
        // ポイントをゲームマネージャーに保持
        GameManager.instance.playerFoodPoints = food;
    }


    private void Update()
    {
        //プレイヤーのターンでなければ抜ける
        if (!GameManager.instance.playersTurn) return;

        int horizontal = (int)(Input.GetAxisRaw("Horizontal")); //横軸
        int vertical = (int)(Input.GetAxisRaw("Vertical")); //縦軸　

        //縦か横に補正
        if (horizontal != 0)
        {
            vertical = 0;
        }

        if (horizontal != 0 || vertical != 0)
        {
            AttemptMove<Wall>(horizontal, vertical);
        }
    }

    // 移動を試みる
    protected override void AttemptMove<T>(int xDir, int yDir)
    {
        //食料減らす
        food--;

        base.AttemptMove<T>(xDir, yDir);

        //ヒットテスト
        RaycastHit2D hit;

        if (Move(xDir, yDir, out hit))
        {
            //Call RandomizeSfx of SoundManager to play the move sound, passing in two audio clips to choose from.
        }

        CheckIfGameOver();

        GameManager.instance.playersTurn = false;
    }


    protected override void OnCantMove<T>(T component)
    {
        Wall hitWall = component as Wall;

        hitWall.DamageWall(wallDamage);

        animator.SetTrigger("playerChop");
    }


    // 何かに重なったときのイベント
    private void OnTriggerEnter2D(Collider2D other)
    {
        //出口か？
        if (other.tag == "Exit")
        {
            //リスタートする
            Invoke("Restart", restartLevelDelay);

            //プレイヤーを消す
            enabled = false;
        }

        //食べ物か？
        else if (other.tag == "Food")
        {
            food += pointsPerFood;
            other.gameObject.SetActive(false);
        }

        //ソーダか？
        else if (other.tag == "Soda")
        {
            food += pointsPerSoda;
            other.gameObject.SetActive(false);
        }
    }


    //リスタート
    private void Restart()
    {
        SceneManager.LoadScene(0);
    }


    //ダメージを受けた時
    public void LoseFood(int loss)
    {
        animator.SetTrigger("playerHit");

        food -= loss;

        CheckIfGameOver();
    }


    //ゲームオーバーチェック
    private void CheckIfGameOver()
    {
        if (food <= 0)
        {
            GameManager.instance.GameOver();
        }
    }
}